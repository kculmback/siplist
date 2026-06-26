import { Skeleton } from "@siplist/ui/components/skeleton";

export function ListItem() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", width: 300 }}>
      <Skeleton style={{ width: 48, height: 48, borderRadius: 999 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <Skeleton style={{ height: 14, width: "70%" }} />
        <Skeleton style={{ height: 14, width: "40%" }} />
      </div>
    </div>
  );
}

export function Card() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 280 }}>
      <Skeleton style={{ height: 140, width: "100%" }} />
      <Skeleton style={{ height: 14, width: "90%" }} />
      <Skeleton style={{ height: 14, width: "60%" }} />
    </div>
  );
}
