import { Button } from "@siplist/ui/components/button";
import { ThemeProvider } from "@siplist/ui/components/theme";

export function Default() {
  return (
    <ThemeProvider>
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: 12,
          alignItems: "center",
        }}
      >
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <span style={{ fontSize: 13, color: "var(--muted-foreground)" }}>
          descendants are themed
        </span>
      </div>
    </ThemeProvider>
  );
}
