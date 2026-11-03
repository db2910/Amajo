import Link from "next/link";
import { Brand } from "@/components/brand";
import { Container } from "@/components/layout/primitives";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-5">
          <Brand />
          <span className="eyebrow text-muted-foreground">
            Rwanda · Uganda · Kenya
          </span>
        </Container>
      </header>
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <footer className="border-t border-cocoa bg-cocoa text-background">
        <Container className="flex flex-col justify-between gap-3 py-6 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} AMAJO · Essence of Africa</p>
          <Link
            href="/foundation"
            className="w-fit underline underline-offset-4 hover:text-gold focus-visible:outline-background"
          >
            Design foundation
          </Link>
        </Container>
      </footer>
    </div>
  );
}
