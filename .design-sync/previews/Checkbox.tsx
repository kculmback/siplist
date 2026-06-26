import { Checkbox } from "@siplist/ui/components/checkbox";
import { Label } from "@siplist/ui/components/label";

export function States() {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Checkbox defaultChecked />
      <Checkbox />
      <Checkbox defaultChecked disabled />
      <Checkbox disabled />
    </div>
  );
}

export function WithLabel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label>
        <Checkbox defaultChecked /> Email me about new releases
      </Label>
      <Label>
        <Checkbox /> Show explicit content
      </Label>
    </div>
  );
}
