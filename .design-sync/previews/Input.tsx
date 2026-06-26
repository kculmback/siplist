import { Input } from "@siplist/ui/components/input";
import { Label } from "@siplist/ui/components/label";

const col: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  width: 280,
};

export function Default() {
  return (
    <div style={col}>
      <Input placeholder="Search songs, artists…" />
      <Input defaultValue="Daft Punk" />
    </div>
  );
}

export function WithLabel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 280 }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  );
}

export function States() {
  return (
    <div style={col}>
      <Input placeholder="Disabled" disabled />
      <Input defaultValue="not-an-email" aria-invalid="true" />
    </div>
  );
}
