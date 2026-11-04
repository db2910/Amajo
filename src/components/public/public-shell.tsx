import { PublicHeader } from "@/components/public/public-header";
import { PublicFooter } from "@/components/public/public-footer";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <PublicHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}
