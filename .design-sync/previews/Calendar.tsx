import { Calendar } from "@siplist/ui/components/calendar";

export function Single() {
  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 5, 1)}
      selected={new Date(2026, 5, 12)}
      style={{ borderRadius: "var(--radius-4xl)" }}
    />
  );
}

export function Range() {
  return (
    <Calendar
      mode="range"
      defaultMonth={new Date(2026, 5, 1)}
      selected={{ from: new Date(2026, 5, 8), to: new Date(2026, 5, 14) }}
    />
  );
}
