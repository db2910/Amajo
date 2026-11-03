import { parseEnv, serverEnvSchema } from "./schema";

export function getServerEnv() {
  if (typeof window !== "undefined")
    throw new Error("Server environment cannot be accessed from a browser");
  return parseEnv(serverEnvSchema, {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
}
