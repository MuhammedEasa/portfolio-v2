import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "A name of at least two letters.").max(100),
  email: z.email("A valid address, so a reply can find you."),
  message: z
    .string()
    .trim()
    .min(10, "Say a little more — ten characters at least.")
    .max(5000, "Five thousand characters at most."),
  // Honeypot — humans never see this field; a filled one is accepted and discarded.
  title: z.string().optional(),
});

// Best-effort rate limiting per instance.
const ledger = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const LIMIT = 5;

function overLimit(ip: string) {
  const now = Date.now();
  const entry = ledger.get(ip);
  if (!entry || now > entry.reset) {
    ledger.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Header values must stay on one line — strip CR/LF and other control
// characters so a crafted name cannot smuggle extra headers into the subject.
const stripHeaderBreaks = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: issue?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  // Bots that fill the hidden field are quietly accepted and discarded.
  if (parsed.data.title) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (overLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many dispatches. Try again in an hour." },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !from || !to) {
    return NextResponse.json(
      { ok: false, error: "The mail service is not configured." },
      { status: 500 }
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Portfolio Correspondence <${from}>`,
    to,
    replyTo: email,
    subject: `Correspondence from ${stripHeaderBreaks(name)}`,
    html: `
      <div style="background:#13100b;padding:48px 24px;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:560px;margin:0 auto;border:1px solid rgba(232,223,201,0.25);padding:40px;">
          <p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#cd7050;">
            Correspondence · muhammedeasa.com
          </p>
          <p style="margin:0 0 6px;font-size:24px;color:#e8dfc9;">${escapeHtml(name)}</p>
          <p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:12px;color:#a59c84;">
            ${escapeHtml(email)}
          </p>
          <div style="height:1px;background:rgba(232,223,201,0.25);margin:0 0 28px;"></div>
          <p style="margin:0;font-size:16px;line-height:1.7;color:#e8dfc9;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </div>
      </div>
    `,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "The dispatch failed. Write directly to easandd@gmail.com." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
