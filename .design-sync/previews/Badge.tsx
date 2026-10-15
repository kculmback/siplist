import { Badge } from "@siplist/ui/components/badge";

export function Variants() {
  return (
    <div style={{ padding: "16px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
      <Badge variant="default">New</Badge>
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
    </div>
  );
}

export function InContext() {
  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Night Drive</span>
        <Badge variant="secondary">Playlist</Badge>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Midnight City</span>
        <Badge variant="default">New</Badge>
        <Badge variant="outline">M83</Badge>
      </div>
    </div>
  );
}
