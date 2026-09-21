import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social-share image for every page that doesn't define its own
// (Ratgeber articles override this with their own opengraph-image.tsx).
// Colors match app/globals.css's design tokens exactly (--color-paper,
// --color-ink, --color-accent) rather than hardcoding a separate palette,
// so this stays visually consistent if the brand colors ever change.
export default async function Image() {
  const markData = await readFile(join(process.cwd(), "public/images/brand/mark.png"));
  const markBase64 = `data:image/png;base64,${markData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#f7f4ee",
          fontFamily: "sans-serif",
        }}
      >
        <img src={markBase64} alt="" width={90} height={90} style={{ marginBottom: 40 }} />
        <div style={{ fontSize: 56, fontWeight: 600, color: "#17140f", lineHeight: 1.2, maxWidth: 900 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 30, color: "#423b31", marginTop: 24, maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 24,
            color: "#a9714b",
            fontWeight: 600,
          }}
        >
          {siteConfig.region} &amp; deutschlandweit
        </div>
      </div>
    ),
    { ...size }
  );
}
