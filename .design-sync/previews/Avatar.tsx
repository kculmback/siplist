import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@siplist/ui/components/avatar";

const row: React.CSSProperties = { display: "flex", gap: 16, alignItems: "center" };

export function Sizes() {
  return (
    <div style={row}>
      <Avatar size="sm">
        <AvatarFallback>KC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function WithBadge() {
  return (
    <div style={row}>
      <Avatar size="lg">
        <AvatarFallback>SC</AvatarFallback>
        <AvatarBadge />
      </Avatar>
    </div>
  );
}

export function Group() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>KC</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+5</AvatarGroupCount>
    </AvatarGroup>
  );
}
