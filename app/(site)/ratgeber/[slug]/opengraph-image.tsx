import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getArticleBySlug } from "@/lib/articles";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Overrides app/opengraph-image.tsx for individual Ratgeber articles so a
// shared link shows the actual article title -- both for social previews
// and because AI answer engines that surface OG metadata benefit from a
// title that matches the specific page, not a generic site-wide image.
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const title = article?.title ?? siteConfig.name;

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
            Ratgeber &middot; {siteConfig.name}
          </div>
        </div>
        <div style={{ fontSize: 52, fontWeight: 600, color: "#17140f", lineHeight: 1.25, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a9714b", fontWeight: 600 }}>
          {siteConfig.url.replace("https://", "")}
        </div>
      </div>
    ),
    { ...size }
  );
}
