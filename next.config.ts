import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async redirects() {
    // www und Apex-Domain liefen beide mit 200 aus; eine Domain, damit Links und Rankingsignale nicht auf zwei Hosts verteilt werden.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.deininger-objektwert.de" }],
        destination: "https://deininger-objektwert.de/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
