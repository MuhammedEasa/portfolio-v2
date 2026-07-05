"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import Cipher from "@/components/Cipher";
import { letter, ui } from "@/lib/manuscript";
import { useTongue } from "@/lib/tongue";

type Status = "idle" | "sending" | "sent" | "failed";

type FieldErrors = Partial<Record<"name" | "email" | "message", true>>;

export function findFaults(name: string, email: string, message: string): FieldErrors {
  const faults: FieldErrors = {};
  if (name.trim().length < 2) faults.name = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) faults.email = true;
  if (message.trim().length < 10) faults.message = true;
  return faults;
}

export default function Letter() {
  const { t } = useTongue();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [faults, setFaults] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<"rate" | "server" | "network" | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = findFaults(name, email, message);
    setFaults(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    setFailure(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          title: honeypot,
        }),
      });
      const data = (await res.json()) as { ok: boolean };
      if (res.ok && data.ok) {
        setStatus("sent");
      } else {
        setFailure(res.status === 429 ? "rate" : "server");
        setStatus("failed");
      }
    } catch {
      setFailure("network");
      setStatus("failed");
    }
  };

  const failureText =
    failure === "rate" ? t(letter.errRate) : failure === "network" ? t(letter.errNetwork) : t(letter.errServer);

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sealed"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex min-h-96 flex-col items-start justify-center gap-8"
        >
          <Cipher className="h-14 w-auto text-rubric" />
          <p className="voice-display text-4xl md:text-5xl">{t(letter.sentTitle)}</p>
          <p className="voice-prose max-w-[40ch] text-lg">{t(letter.sentBody)}</p>
          <button
            type="button"
            data-cursor={t(ui.cursor.again)}
            onClick={() => {
              setName("");
              setEmail("");
              setMessage("");
              setStatus("idle");
            }}
            className="link-rubric font-serif text-lg"
          >
            {t(letter.sendAnother)}
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={false}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: "easeIn" }}
          onSubmit={onSubmit}
          noValidate
          className="flex flex-col gap-10"
        >
          <div>
            <label htmlFor="letter-name" className="voice-whisper mb-1 block">
              {t(letter.nameLabel)}
            </label>
            <input
              id="letter-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t(letter.namePlaceholder)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field-royal"
              aria-invalid={!!faults.name}
            />
            {faults.name && (
              <p role="alert" className="mt-2 font-serif text-sm text-vermilion">
                {t(letter.errName)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="letter-email" className="voice-whisper mb-1 block">
              {t(letter.emailLabel)}
            </label>
            <input
              id="letter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t(letter.emailPlaceholder)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-royal"
              aria-invalid={!!faults.email}
            />
            {faults.email && (
              <p role="alert" className="mt-2 font-serif text-sm text-vermilion">
                {t(letter.errEmail)}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="letter-message" className="voice-whisper mb-1 block">
              {t(letter.messageLabel)}
            </label>
            <textarea
              id="letter-message"
              name="message"
              rows={5}
              placeholder={t(letter.messagePlaceholder)}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="field-royal resize-none"
              aria-invalid={!!faults.message}
            />
            {faults.message && (
              <p role="alert" className="mt-2 font-serif text-sm text-vermilion">
                {t(letter.errMessage)}
              </p>
            )}
          </div>

          {/* Unseen by people; irresistible to machines. */}
          <input
            type="text"
            name="title"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden
          />

          {status === "failed" && failure && (
            <p role="alert" className="font-serif text-base text-rubric">
              {failureText}
            </p>
          )}

          <div className="flex items-center gap-8">
            <button
              type="submit"
              data-cursor={t(ui.cursor.send)}
              disabled={status === "sending"}
              className="voice-whisper group relative overflow-hidden border border-ink/30 px-12 py-5 text-ink transition-[border-color,transform] duration-500 hover:border-ink/55 active:scale-98 disabled:opacity-50"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-rubric/10 transition-transform duration-500 group-hover:scale-y-100" />
              <span className="relative">
                {status === "sending" ? t(letter.sending) : t(letter.submit)}
              </span>
            </button>
            {status === "sending" && (
              <span className="voice-whisper animate-pulse text-rubric">
                {t(letter.sendingNote)}
              </span>
            )}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
