import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 192, height: 192 };

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
          borderRadius: "28%",
          boxShadow: "0 0 0 12px rgba(34, 211, 238, 0.25)",
        }}
      >
        <div
          style={{
            width: "78%",
            height: "78%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#101826",
            borderRadius: "22%",
            color: "#e2f5ff",
            fontSize: 64,
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
