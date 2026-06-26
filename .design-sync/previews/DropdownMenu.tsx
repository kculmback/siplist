import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@siplist/ui/components/dropdown-menu";

export function Default() {
  return (
    <div style={{ padding: "40px 16px 16px" }}>
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger className="inline-flex items-center gap-1.5 rounded-xl border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm">
          <MoreHorizontalIcon size={14} />
          Options
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Playlist</DropdownMenuLabel>
            <DropdownMenuItem>Add to queue</DropdownMenuItem>
            <DropdownMenuItem>
              Edit details
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete playlist</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
