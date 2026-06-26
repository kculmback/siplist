import { Label } from "@siplist/ui/components/label";
import { Textarea } from "@siplist/ui/components/textarea";

export function Default() {
  return (
    <div style={{ width: 320 }}>
      <Textarea placeholder="Add a note about this playlist…" />
    </div>
  );
}

export function WithLabel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 320 }}>
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        defaultValue="Curating late-night synthwave and city pop since 2019."
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 320 }}>
      <Textarea placeholder="Comments are turned off" disabled />
    </div>
  );
}
