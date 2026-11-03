import { LockKeyhole } from "lucide-react";
import { Stack } from "@/components/layout/primitives";

export default function AdminPage() {
  return (
    <Stack className="max-w-xl">
      <LockKeyhole className="size-8 text-primary" aria-hidden="true" />
      <p className="eyebrow text-primary">Phase 1 · Layout foundation</p>
      <h1 className="section-title">
        A space for the people behind the journeys.
      </h1>
      <p className="text-muted-foreground">
        Administration is not yet available. Staff authentication and content
        management will be connected in their scheduled development phases.
      </p>
    </Stack>
  );
}
