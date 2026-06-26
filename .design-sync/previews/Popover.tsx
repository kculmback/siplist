import { Button } from "@siplist/ui/components/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@siplist/ui/components/popover";

export function Default() {
  return (
    <Popover defaultOpen>
      <PopoverTrigger render={<Button variant="outline">Share playlist</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Share “Night Drive”</PopoverTitle>
          <PopoverDescription>Anyone with the link can listen.</PopoverDescription>
        </PopoverHeader>
        <Button size="sm">Copy link</Button>
      </PopoverContent>
    </Popover>
  );
}
