import { Button } from "@siplist/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siplist/ui/components/tooltip";

export function Default() {
  return (
    <div style={{ padding: "40px 60px 16px" }}>
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">Add to queue</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add song to your queue</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
