"use client";

/**
 * Last-resort boundary: replaces the root layout entirely, so globals.css
 * and the providers are unavailable — everything must be inline.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.75rem",
          background: "#13100b",
          color: "#e8dfc9",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "Arial, sans-serif",
            fontSize: "10px",
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#cd7050",
          }}
        >
          Muhammed Easa
        </p>
        <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: 400 }}>
          The page failed to render.
        </h1>
        <button
          onClick={() => reset()}
          style={{
            background: "none",
            border: "1px solid rgba(232,223,201,0.35)",
            color: "#e8dfc9",
            padding: "0.9rem 2.4rem",
            fontFamily: "inherit",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
