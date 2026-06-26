import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@siplist/ui/components/input-group";

export function Search() {
  return (
    <div style={{ width: 300 }}>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search songs and artists…" />
      </InputGroup>
    </div>
  );
}

export function WithButton() {
  return (
    <div style={{ width: 300 }}>
      <InputGroup>
        <InputGroupInput placeholder="Add a tag" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default">Add</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function WithPrefix() {
  return (
    <div style={{ width: 300 }}>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>siplist.fm/</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="your-handle" />
      </InputGroup>
    </div>
  );
}
