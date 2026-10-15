import { MoreHorizontalIcon, MusicIcon } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@siplist/ui/components/item";

export function Default() {
  return (
    <div style={{ padding: "16px", width: "320px" }}>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <MusicIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Midnight City</ItemTitle>
          <ItemDescription>M83 · Hurry Up, We're Dreaming</ItemDescription>
        </ItemContent>
        <ItemActions>
          <MoreHorizontalIcon size={16} style={{ opacity: 0.5 }} />
        </ItemActions>
      </Item>
    </div>
  );
}

export function List() {
  const tracks = [
    { title: "Midnight City", artist: "M83" },
    { title: "Oblivion", artist: "Grimes" },
    { title: "Intro", artist: "The xx" },
  ];
  return (
    <div style={{ padding: "16px", width: "320px" }}>
      <ItemGroup>
        {tracks.map((t, i) => (
          <>
            <Item key={t.title}>
              <ItemMedia variant="icon">
                <MusicIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{t.title}</ItemTitle>
                <ItemDescription>{t.artist}</ItemDescription>
              </ItemContent>
            </Item>
            {i < tracks.length - 1 && <ItemSeparator key={`sep-${i}`} />}
          </>
        ))}
      </ItemGroup>
    </div>
  );
}

export function Muted() {
  return (
    <div style={{ padding: "16px", width: "320px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Daft Punk</ItemTitle>
          <ItemDescription>Electronic · French house</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Justice</ItemTitle>
          <ItemDescription>Electronic · Electro</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
