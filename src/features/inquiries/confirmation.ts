import "server-only";
import type { ConfirmedInquiry } from "./contracts";

/** Phase 5 implements a protected receipt session after a durable commit. Query params are never proof. */
export async function confirmedInquiry(): Promise<ConfirmedInquiry | null> {
  return null;
}
