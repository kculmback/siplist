import { Checkbox } from "@siplist/ui/components/checkbox";
import { Input } from "@siplist/ui/components/input";
import { Label } from "@siplist/ui/components/label";

export function ForInput() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 260 }}>
      <Label htmlFor="label-name">Playlist name</Label>
      <Input id="label-name" placeholder="Untitled playlist" />
    </div>
  );
}

export function WithControl() {
  return (
    <Label>
      <Checkbox defaultChecked /> Make this playlist public
    </Label>
  );
}
