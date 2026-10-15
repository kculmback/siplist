import { Progress, ProgressLabel, ProgressValue } from "@siplist/ui/components/progress";

export function Default() {
  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px", width: "280px" }}>
      <Progress value={60} />
    </div>
  );
}

export function WithLabel() {
  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px", width: "280px" }}>
      <Progress value={40}>
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={75}>
        <ProgressLabel>Processing</ProgressLabel>
        <ProgressValue />
      </Progress>
      <Progress value={100}>
        <ProgressLabel>Complete</ProgressLabel>
        <ProgressValue />
      </Progress>
    </div>
  );
}
