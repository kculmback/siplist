import { ArrowRightIcon, HeartIcon, PlusIcon } from "lucide-react";

import { Button } from "@siplist/ui/components/button";

const row: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  alignItems: "center",
};

export function Variants() {
  return (
    <div style={row}>
      <Button>Save changes</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="link">Learn more</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={row}>
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

export function WithIcons() {
  return (
    <div style={row}>
      <Button>
        <PlusIcon /> New playlist
      </Button>
      <Button variant="outline">
        Continue <ArrowRightIcon />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Like">
        <HeartIcon />
      </Button>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={row}>
      <Button disabled>Saving…</Button>
      <Button variant="outline" disabled>
        Unavailable
      </Button>
    </div>
  );
}
