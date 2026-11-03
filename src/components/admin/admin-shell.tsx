import Link from "next/link";
import { Brand } from "@/components/brand";
import { Container } from "@/components/layout/primitives";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b bg-cocoa p-6 text-background lg:min-h-dvh lg:border-r lg:border-b-0">
        <Brand compact />
        <div className="mt-10 border-t border-background/20 pt-6">
          <p className="eyebrow text-background/80">Administration</p>
          <p className="mt-3 text-sm text-background/80">
            Workspace foundation
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md text-sm underline underline-offset-4"
        >
          Return to public site
        </Link>
      </aside>
      <div className="min-w-0">
        <header className="border-b bg-card px-5 py-6 md:px-8">
          <p className="eyebrow text-muted-foreground">AMAJO Studio</p>
        </header>
        <main id="main-content" tabIndex={-1}>
          <Container className="py-12 md:py-16">{children}</Container>
        </main>
      </div>
    </div>
  );
}
