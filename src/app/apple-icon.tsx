import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e8a8f",
        }}
      >
        <svg width="120" height="120" viewBox="4 4 24 24">
          <path d="M10 8v6a5 5 0 0 0 10 0V8" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M15 19v1.5a4.5 4.5 0 0 0 9 0V18" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="24" cy="15.6" r="2.3" fill="none" stroke="#fff" strokeWidth="2" />
          <path d="M22 5.5v4M20 7.5h4" stroke="#bfeaea" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
