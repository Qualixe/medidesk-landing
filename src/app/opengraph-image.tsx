import { ImageResponse } from "next/og";

export const alt = "MediDesk — Run your chamber, not paperwork.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #f6f8fa 0%, #e9f6f6 100%)",
          color: "#0f1d2e",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#0e8a8f" />
            <path d="M10 8v6a5 5 0 0 0 10 0V8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M15 19v1.5a4.5 4.5 0 0 0 9 0V18" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="24" cy="15.6" r="2.3" fill="none" stroke="#fff" strokeWidth="2" />
            <path d="M22 5.5v4M20 7.5h4" stroke="#bfeaea" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 44, fontWeight: 700 }}>MediDesk</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            <span>Run your chamber,</span>
            <span style={{ color: "#0a6e73" }}>not paperwork.</span>
          </div>
          <div style={{ fontSize: 30, color: "#5b697e" }}>
            Patients, appointments, prescriptions and billing — one desktop app for doctors in Bangladesh.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#0a6e73" }}>
          <span>Windows & macOS</span>
          <span>·</span>
          <span>English & Bangla</span>
          <span>·</span>
          <span>Free 7-day trial</span>
        </div>
      </div>
    ),
    size,
  );
}
