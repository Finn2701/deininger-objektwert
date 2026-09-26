import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async redirects() {
    // Kanonisch ist www.deininger-objektwert.de; die Domain ohne www leitet dauerhaft dorthin um, damit Links und Rankingsignale nicht auf zwei Hosts verteilt werden.
    return [
      {
        source: "/:path((?!api/cron).*)",
        has: [{ type: "host", value: "deininger-objektwert.de" }],
        destination: "https://www.deininger-objektwert.de/:path*",
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
