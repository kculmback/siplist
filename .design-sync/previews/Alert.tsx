import { InfoIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@siplist/ui/components/alert";
import { Button } from "@siplist/ui/components/button";

export function Default() {
  return (
    <div style={{ padding: "16px" }}>
      <Alert>
        <InfoIcon />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Your playlist is syncing across devices. Changes may take a moment.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function Destructive() {
  return (
    <div style={{ padding: "16px" }}>
      <Alert variant="destructive">
        <TriangleAlertIcon />
        <AlertTitle>Sync failed</AlertTitle>
        <AlertDescription>
          Could not connect to the server. Check your network and try again.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function WithAction() {
  return (
    <div style={{ padding: "16px" }}>
      <Alert>
        <InfoIcon />
        <AlertTitle>New version available</AlertTitle>
        <AlertDescription>
          Update to get the latest features and bug fixes.
        </AlertDescription>
        <AlertAction>
          <Button variant="outline" size="sm">Update now</Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
