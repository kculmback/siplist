import { Slider } from "@siplist/ui/components/slider";

export function Single() {
  return (
    <div style={{ width: 280 }}>
      <Slider defaultValue={[40]} />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ width: 280 }}>
      <Slider defaultValue={[20, 70]} />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 280 }}>
      <Slider defaultValue={[50]} disabled />
    </div>
  );
}
