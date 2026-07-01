import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy — set in next.config (no nonces) so pages stay
// statically generated. What the site actually loads, and the directive that allows it:
//   - Google Fonts:  @import in globals.css → style-src fonts.googleapis.com,
//                    font files → font-src fonts.gstatic.com
//   - Google Analytics (consent-gated in CookieBanner.tsx): gtag.js loader +
//     inline bootstrap → script-src googletagmanager.com + 'unsafe-inline',
//     beacons → connect-src/img-src *.google-analytics.com + regional endpoints
//   - Inline style attributes (CSS-in-JS) → style-src 'unsafe-inline'
// 'unsafe-eval' is dev-only (React uses eval for error overlays; never in prod).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' blob: data: https://*.google-analytics.com https://*.googletagmanager.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

// Design-independent HTTP security headers, applied to every route.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
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
