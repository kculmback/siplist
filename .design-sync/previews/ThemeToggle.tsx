import { ThemeProvider, ThemeToggle } from "@siplist/ui/components/theme";

export function Default() {
  return (
    <ThemeProvider>
      <div style={{ padding: 8 }}>
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
