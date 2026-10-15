import { ChevronDownIcon } from "lucide-react";
import { Button } from "@siplist/ui/components/button";
import { ButtonGroup } from "@siplist/ui/components/button-group";

export function Default() {
  return (
    <div style={{ padding: "16px" }}>
      <ButtonGroup>
        <Button variant="outline">Previous</Button>
        <Button variant="outline">Next</Button>
      </ButtonGroup>
    </div>
  );
}

export function WithSplit() {
  return (
    <div style={{ padding: "16px" }}>
      <ButtonGroup>
        <Button>Save changes</Button>
        <Button size="icon">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ padding: "16px" }}>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    </div>
  );
}
