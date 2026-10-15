import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { Toggle } from "@siplist/ui/components/toggle";

export function States() {
  return (
    <div style={{ padding: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
      <Toggle aria-label="Bold" defaultPressed={true}>
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ padding: "16px", display: "flex", gap: "8px", alignItems: "center" }}>
      <Toggle size="sm" aria-label="Small bold" defaultPressed={true}>
        <BoldIcon />
      </Toggle>
      <Toggle size="default" aria-label="Default bold">
        <BoldIcon />
      </Toggle>
      <Toggle size="lg" aria-label="Large bold">
        <BoldIcon />
      </Toggle>
    </div>
  );
}
