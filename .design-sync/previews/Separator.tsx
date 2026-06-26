import { Separator } from "@siplist/ui/components/separator";

export function Horizontal() {
  return (
    <div style={{ width: 280 }}>
      <div style={{ fontSize: 14, fontWeight: 500 }}>Now Playing</div>
      <div style={{ margin: "12px 0" }}>
        <Separator />
      </div>
      <div style={{ fontSize: 14, color: "var(--muted-foreground)" }}>Up Next</div>
    </div>
  );
}

export function Vertical() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 20,
        fontSize: 14,
      }}
    >
      <span>Profile</span>
      <Separator orientation="vertical" />
      <span>Settings</span>
      <Separator orientation="vertical" />
      <span style={{ color: "var(--muted-foreground)" }}>Log out</span>
    </div>
  );
}
