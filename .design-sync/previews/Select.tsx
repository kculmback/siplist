import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@siplist/ui/components/select";

export function Default() {
  return (
    <Select defaultValue="pop" defaultOpen>
      <SelectTrigger style={{ width: 200 }}>
        <SelectValue placeholder="Pick a genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Genres</SelectLabel>
          <SelectItem value="pop">Pop</SelectItem>
          <SelectItem value="rock">Rock</SelectItem>
          <SelectItem value="jazz">Jazz</SelectItem>
          <SelectItem value="electronic">Electronic</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
