import type { NextConfig } from "next";
import { getPublicEnv } from "./src/lib/env/public";
import { getServerEnv } from "./src/lib/env/server";

getPublicEnv();
getServerEnv();

const config: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default config;
