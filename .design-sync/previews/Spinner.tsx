import { Button } from "@siplist/ui/components/button";
import { Spinner } from "@siplist/ui/components/spinner";

export function Sizes() {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Spinner style={{ width: 16, height: 16 }} />
      <Spinner style={{ width: 24, height: 24 }} />
      <Spinner style={{ width: 32, height: 32, color: "var(--primary)" }} />
    </div>
  );
}

export function WithText() {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        fontSize: 14,
        color: "var(--muted-foreground)",
      }}
    >
      <Spinner />
      Loading your library…
    </div>
  );
}

export function InButton() {
  return (
    <Button disabled>
      <Spinner />
      Saving…
    </Button>
  );
}
