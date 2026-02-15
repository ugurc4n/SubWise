import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 180, height: 180 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0f",
          borderRadius: "22%",
        }}
      >
        <div
          style={{
            width: "76%",
            height: "76%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#101826",
            borderRadius: "20%",
            color: "#e2f5ff",
            fontSize: 60,
            fontWeight: 700,
            letterSpacing: "-0.05em",
          }}
        >
          SW
        </div>
      </div>
    ),
    size
  );
}
