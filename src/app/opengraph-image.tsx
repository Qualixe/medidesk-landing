import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "MediDesk — Run your chamber, not paperwork.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Cached so the image is generated once at build time and served statically. */
async function getLogoDataUrl() {
  "use cache";
  const logo = await readFile(join(process.cwd(), "src/assets/medidesk-logo-512.png"));
  return `data:image/png;base64,${logo.toString("base64")}`;
}

export default async function OpengraphImage() {
  const logoSrc = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: 72,
          background: "linear-gradient(135deg, #f5f8fc 0%, #e6f4fe 55%, #dcebff 100%)",
          color: "#0b1b36",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={64} height={64} alt="" />
            <div style={{ fontSize: 40, fontWeight: 700 }}>MediDesk</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            <span>Run your chamber,</span>
            <span style={{ color: "#0149cf" }}>not paperwork.</span>
          </div>
          <div style={{ fontSize: 28, color: "#5b6b85", lineHeight: 1.35 }}>
            Patients, appointments, prescriptions and billing — one desktop app for doctors in Bangladesh.
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 22, color: "#0149cf" }}>
            <span>Windows & macOS</span>
            <span>·</span>
            <span>English & Bangla</span>
            <span>·</span>
            <span>Free 7-day trial</span>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={340} alt="" />
      </div>
    ),
    size,
  );
}
