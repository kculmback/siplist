import { ScrollArea } from "@siplist/ui/components/scroll-area";

const TRACKS = [
  "Midnight City",
  "Oblivion",
  "Intro",
  "Open Eye Signal",
  "Strange Mercy",
  "Northern Lights",
  "Apocalypse Dreams",
  "Lost in the Light",
];

export function Default() {
  return (
    <div style={{ padding: "16px" }}>
      <ScrollArea style={{ height: "180px", width: "240px", border: "1px solid var(--border)", borderRadius: "12px" }}>
        <div style={{ padding: "8px" }}>
          {TRACKS.map((t) => (
            <div
              key={t}
              style={{
                padding: "8px 12px",
                fontSize: "0.875rem",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
