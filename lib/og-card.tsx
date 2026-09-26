import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/lib/site-config";

export const ogSize = { width: 1200, height: 630 };

/** Gemeinsame Vorlage für Social-Share-Bilder (Farben wie app/opengraph-image.tsx / globals.css). */
export async function ogCard({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string }) {
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
          justifyContent: "space-between",
          padding: "80px",
          background: "#f7f4ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={markBase64} alt="" width={56} height={56} style={{ marginRight: 20 }} />
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#423b31" }}>
            {kicker} &middot; {siteConfig.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, color: "#17140f", lineHeight: 1.15, maxWidth: 1040 }}>
            {title}
          </div>
          {subtitle ? (
            <div style={{ display: "flex", fontSize: 30, color: "#423b31", marginTop: 28, maxWidth: 1040 }}>{subtitle}</div>
          ) : null}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a9714b", fontWeight: 600 }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
