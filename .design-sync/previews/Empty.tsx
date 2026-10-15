import { MusicIcon, SearchIcon } from "lucide-react";
import { Button } from "@siplist/ui/components/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@siplist/ui/components/empty";

export function Default() {
  return (
    <div style={{ padding: "16px", width: "320px" }}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MusicIcon />
          </EmptyMedia>
          <EmptyTitle>No playlists yet</EmptyTitle>
          <EmptyDescription>
            Create your first playlist to start organizing your music.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create playlist</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export function SearchEmpty() {
  return (
    <div style={{ padding: "16px", width: "320px" }}>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <SearchIcon />
          </EmptyMedia>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search or browse all tracks.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
