import type { NextConfig } from "next";

// Design-independent HTTP security headers, applied to every route.
// NOTE: Content-Security-Policy (CSP) is intentionally NOT set here yet —
// it depends on exactly what the site loads, so it's added after the redesign.
const securityHeaders = [
  // Force HTTPS for 2 years, including subdomains. Prevents downgrade/interception.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Disallow other sites from embedding this one (clickjacking protection).
  { key: "X-Frame-Options", value: "DENY" },
  // Don't let the browser guess file types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer info leaked when visitors click away.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // This site never needs camera, microphone, or geolocation.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
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
