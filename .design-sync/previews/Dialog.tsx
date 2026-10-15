import { Button } from "@siplist/ui/components/button";
import { Input } from "@siplist/ui/components/input";
import { Label } from "@siplist/ui/components/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@siplist/ui/components/dialog";

export function Default() {
  return (
    <div style={{ padding: "16px" }}>
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button variant="outline">Edit playlist</Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Edit playlist</DialogTitle>
            <DialogDescription>
              Update the name and description for this playlist.
            </DialogDescription>
          </DialogHeader>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Night Drive" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
