import { CalendarIcon, MusicIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@siplist/ui/components/hover-card";

export function Default() {
  return (
    <div style={{ padding: "16px 24px 80px" }}>
      <HoverCard defaultOpen>
        <HoverCardTrigger
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          @nightdrive
        </HoverCardTrigger>
        <HoverCardContent>
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MusicIcon size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: 2 }}>Night Drive</p>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.75rem", marginBottom: 8 }}>
                A curated mix of late-night electronic tracks.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                }}
              >
                <CalendarIcon size={12} />
                <span>Created June 2026</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
