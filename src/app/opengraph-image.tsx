import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "72px",
          background: "linear-gradient(135deg, #0b1220 0%, #111827 45%, #1e293b 100%)",
          color: "#f8fafc",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <p style={{ margin: 0, fontSize: 34, opacity: 0.85 }}>hasaamb.com</p>
          <h1 style={{ margin: 0, fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>
            Hasaam Bhatti
          </h1>
          <p style={{ margin: 0, fontSize: 34, opacity: 0.9 }}>AI Engineer and Founder</p>
        </div>
      </div>
    ),
    size,
  );
}
