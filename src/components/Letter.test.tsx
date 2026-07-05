import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Letter from "./Letter";

// English strings come from the default TongueContext value (no provider needed).
const TEXT = {
  success: "Word received.",
  rate: "Too many dispatches — try again in an hour.",
  server: "The dispatch failed. Write directly to easandd@gmail.com.",
  network: "The dispatch could not leave. Check your connection and try again.",
};

const fillValid = () => {
  fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Test Sender" } });
  fireEvent.change(screen.getByLabelText("Your email"), { target: { value: "sender@example.com" } });
  fireEvent.change(screen.getByLabelText("The matter"), {
    target: { value: "A message long enough to pass validation." },
  });
};

const submit = () => fireEvent.click(screen.getByRole("button", { name: "Dispatch" }));

const stubFetch = (status: number, body: unknown) => {
  const mock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
  vi.stubGlobal("fetch", mock);
  return mock;
};

afterEach(() => {
  vi.unstubAllGlobals();
  cleanup();
});

describe("honeypot field", () => {
  it("is present, non-tabbable, and hidden from humans and assistive tech", () => {
    render(<Letter />);
    const honeypot = document.querySelector('input[name="title"]') as HTMLInputElement;
    expect(honeypot).not.toBeNull();
    // Non-tabbable: keyboard users must never land in it.
    expect(honeypot.tabIndex).toBe(-1);
    // Hidden from assistive tech.
    expect(honeypot.getAttribute("aria-hidden")).toBe("true");
    // Visually hidden (jsdom computes no layout, so assert the classes that hide it).
    expect(honeypot.className).toContain("absolute");
    expect(honeypot.className).toContain("left-[-9999px]");
    expect(honeypot.className).toContain("opacity-0");
    expect(honeypot.className).toContain("h-0");
    expect(honeypot.className).toContain("w-0");
    // Browsers must not autofill it into visibility.
    expect(honeypot.getAttribute("autocomplete")).toBe("off");
  });

  it("is submitted with the payload so the server can inspect it", async () => {
    const mock = stubFetch(200, { ok: true });
    render(<Letter />);
    fillValid();
    submit();
    await screen.findByText(TEXT.success, undefined, { timeout: 3000 });
    const [url, init] = mock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse((init as RequestInit).body as string).title).toBe("");
  });
});

describe("response states", () => {
  it("200: replaces the form with the sealed success state", async () => {
    stubFetch(200, { ok: true });
    render(<Letter />);
    fillValid();
    submit();
    expect(await screen.findByText(TEXT.success, undefined, { timeout: 3000 })).toBeTruthy();
    // The form is gone; only the success view remains.
    expect(screen.queryByRole("button", { name: "Dispatch" })).toBeNull();
    expect(screen.getByRole("button", { name: "Send another" })).toBeTruthy();
  });

  it("429: shows the rate-limit message and keeps the form", async () => {
    stubFetch(429, { ok: false, error: "Too many dispatches." });
    render(<Letter />);
    fillValid();
    submit();
    const alert = await screen.findByText(TEXT.rate, undefined, { timeout: 3000 });
    expect(alert.getAttribute("role")).toBe("alert");
    expect(screen.getByRole("button", { name: "Dispatch" })).toBeTruthy();
    expect(screen.queryByText(TEXT.success)).toBeNull();
  });

  for (const status of [400, 500, 502]) {
    it(`${status}: shows the server-failure message and keeps the form`, async () => {
      stubFetch(status, { ok: false, error: "failed" });
      render(<Letter />);
      fillValid();
      submit();
      const alert = await screen.findByText(TEXT.server, undefined, { timeout: 3000 });
      expect(alert.getAttribute("role")).toBe("alert");
      expect(screen.getByRole("button", { name: "Dispatch" })).toBeTruthy();
      expect(screen.queryByText(TEXT.success)).toBeNull();
    });
  }

  it("network failure: shows the connection message, distinct from server failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));
    render(<Letter />);
    fillValid();
    submit();
    const alert = await screen.findByText(TEXT.network, undefined, { timeout: 3000 });
    expect(alert.getAttribute("role")).toBe("alert");
    expect(screen.queryByText(TEXT.server)).toBeNull();
    expect(screen.queryByText(TEXT.success)).toBeNull();
  });

  it("client validation failure: no request is made at all", () => {
    const mock = stubFetch(200, { ok: true });
    render(<Letter />);
    // Submit the empty form.
    submit();
    expect(mock).not.toHaveBeenCalled();
    expect(screen.getAllByRole("alert").length).toBe(3);
  });
});
