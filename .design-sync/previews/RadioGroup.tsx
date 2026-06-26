import { Label } from "@siplist/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@siplist/ui/components/radio-group";

export function Default() {
  return (
    <RadioGroup defaultValue="weekly" style={{ width: 280 }}>
      <Label>
        <RadioGroupItem value="daily" /> Daily digest
      </Label>
      <Label>
        <RadioGroupItem value="weekly" /> Weekly digest
      </Label>
      <Label>
        <RadioGroupItem value="never" /> Never
      </Label>
    </RadioGroup>
  );
}

export function Disabled() {
  return (
    <RadioGroup defaultValue="standard" style={{ width: 280 }}>
      <Label>
        <RadioGroupItem value="standard" /> Standard quality
      </Label>
      <Label style={{ opacity: 0.5 }}>
        <RadioGroupItem value="lossless" disabled /> Lossless (Premium)
      </Label>
    </RadioGroup>
  );
}
