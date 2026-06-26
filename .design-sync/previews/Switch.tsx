import { Switch } from "@siplist/ui/components/switch";

const row: React.CSSProperties = {
  display: "flex",
  gap: 20,
  alignItems: "center",
};

export function States() {
  return (
    <div style={row}>
      <Switch defaultChecked />
      <Switch />
      <Switch defaultChecked disabled />
      <Switch disabled />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={row}>
      <Switch size="default" defaultChecked />
      <Switch size="sm" defaultChecked />
    </div>
  );
}

export function WithLabel() {
  return (
    <label
      style={{
        display: "inline-flex",
        gap: 10,
        alignItems: "center",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      <Switch defaultChecked />
      Autoplay similar songs
    </label>
  );
}
