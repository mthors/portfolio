import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 16,
        background: "#07111f",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#00b4d8",
        fontWeight: 800,
        borderRadius: "6px",
        border: "1px solid #24384d",
        fontFamily: "monospace",
      }}
    >
      TS
    </div>,
    {
      ...size,
    }
  );
}
