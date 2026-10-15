import { AspectRatio } from "@siplist/ui/components/aspect-ratio";

export function Widescreen() {
  return (
    <div style={{ padding: "16px", width: "280px" }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #1e3a5f 0%, #0d7377 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          16 / 9
        </div>
      </AspectRatio>
    </div>
  );
}

export function Square() {
  return (
    <div style={{ padding: "16px", width: "160px" }}>
      <AspectRatio ratio={1}>
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #2d1b69 0%, #0d7377 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "0.75rem",
            fontWeight: 500,
          }}
        >
          1 / 1
        </div>
      </AspectRatio>
    </div>
  );
}
