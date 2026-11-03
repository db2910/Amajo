import type { Metadata } from "next";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AMAJO — Essence of Africa", template: "%s | AMAJO" },
  description:
    "AMAJO — journeys through Rwanda, Uganda and Kenya. A considered foundation for discovering East Africa.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
