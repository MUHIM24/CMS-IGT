import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";
import { siteSettings } from "@/lib/content/site-settings";

export const alt = siteSettings.companyName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await readFile(join(process.cwd(), "public/logo-icon.png"));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(140deg, #071c26 0%, #0b2a38 45%, #1a4f66 100%)",
          padding: 80,
        }}
      >
        {/* next/image gak bisa dipakai di dalam ImageResponse (Satori, bukan React DOM biasa) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={96} height={99} style={{ marginBottom: 32 }} />
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          {siteSettings.companyName}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 30,
            color: "#67bed9",
            textAlign: "center",
          }}
        >
          {siteSettings.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
