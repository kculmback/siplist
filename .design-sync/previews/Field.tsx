import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@siplist/ui/components/field";
import { Input } from "@siplist/ui/components/input";
import { Switch } from "@siplist/ui/components/switch";

export function Vertical() {
  return (
    <div style={{ width: 320 }}>
      <Field>
        <FieldLabel htmlFor="display-name">Display name</FieldLabel>
        <Input id="display-name" placeholder="DJ Nightcall" />
        <FieldDescription>This is how you’ll appear to others.</FieldDescription>
      </Field>
    </div>
  );
}

export function Horizontal() {
  return (
    <div style={{ width: 340 }}>
      <Field orientation="horizontal">
        <FieldContent>
          <FieldTitle>Private session</FieldTitle>
          <FieldDescription>Hide your listening activity for now.</FieldDescription>
        </FieldContent>
        <Switch defaultChecked />
      </Field>
    </div>
  );
}

export function Group() {
  return (
    <div style={{ width: 340 }}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-email">Email</FieldLabel>
          <Input id="field-email" type="email" placeholder="you@example.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-pw">Password</FieldLabel>
          <Input id="field-pw" type="password" defaultValue="correcthorse" />
          <FieldDescription>Must be at least 8 characters.</FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  );
}
