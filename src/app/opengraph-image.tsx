import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hasaam Bhatti: I build software and sell things";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "80px",
          background: "#F7F7F7",
          color: "#292929",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: 0, fontSize: 32, color: "#5D5D5D" }}>Hasaam Bhatti</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1 style={{ margin: 0, fontSize: 96, lineHeight: 1.05, fontWeight: 300, letterSpacing: "-0.03em" }}>
            I build software and sell things
          </h1>
          <p style={{ margin: 0, fontSize: 32, color: "#5D5D5D" }}>
            From idea to shelf, from the backend to the box.
          </p>
        </div>
      </div>
    ),
    size,
  );
}
