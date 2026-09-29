import { ImageResponse } from "next/og";
import { LENSES } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Hasaam Bhatti";

export function generateStaticParams() {
  return LENSES.map((l) => ({ lens: l.slug }));
}

// Same layout as the home image, with the lens as the headline.
export default function OpenGraphImage({ params }: { params: { lens: string } }) {
  const lens = LENSES.find((l) => l.slug === params.lens)!;
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
            {lens.title}
          </h1>
          <p style={{ margin: 0, fontSize: 32, color: "#5D5D5D" }}>{lens.line}</p>
        </div>
      </div>
    ),
    size,
  );
}
