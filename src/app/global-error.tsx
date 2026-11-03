"use client";

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
          padding: "3rem 1.25rem",
          background: "#fcf9f4",
          color: "#2c140e",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <main>
          <p>AMAJO — Essence of Africa</p>
          <h1>We couldn’t load this page.</h1>
          <p>Please try again or return to the homepage.</p>
          <button
            onClick={reset}
            style={{ padding: "0.75rem 1.25rem", cursor: "pointer" }}
          >
            Try again
          </button>
          <p>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Root error recovery deliberately reloads the entire document. */}
            <a href="/">Return home</a>
          </p>
        </main>
      </body>
    </html>
  );
}
