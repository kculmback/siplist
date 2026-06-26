import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@siplist/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@siplist/ui/components/card";

export function Basic() {
  return (
    <Card style={{ width: 360 }}>
      <CardHeader>
        <CardTitle>Discover Weekly</CardTitle>
        <CardDescription>
          Your weekly mixtape of fresh music, updated every Monday.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, color: "var(--muted-foreground)", fontSize: 14 }}>
          30 songs · about 2 hr 15 min
        </p>
      </CardContent>
      <CardFooter style={{ gap: 8 }}>
        <Button size="sm">Play</Button>
        <Button size="sm" variant="outline">
          Add to library
        </Button>
      </CardFooter>
    </Card>
  );
}

export function WithAction() {
  return (
    <Card style={{ width: 360 }}>
      <CardHeader
        style={{
          borderBottom: "1px solid var(--border)",
          paddingBottom: 24,
        }}
      >
        <CardTitle>Liked Songs</CardTitle>
        <CardDescription>1,204 songs you’ve saved</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost" aria-label="More options">
            <MoreHorizontalIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
          Recently added “Midnight City”, “Redbone”, and “Nightcall” to your
          collection.
        </p>
      </CardContent>
    </Card>
  );
}

export function Compact() {
  return (
    <Card size="sm" style={{ width: 280 }}>
      <CardHeader>
        <CardTitle>Storage</CardTitle>
        <CardDescription>8.2 GB of 15 GB used</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          style={{
            height: 6,
            borderRadius: 999,
            background: "var(--muted)",
            overflow: "hidden",
          }}
        >
          <div
            style={{ height: "100%", width: "55%", background: "var(--primary)" }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
