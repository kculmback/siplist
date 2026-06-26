import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@siplist/ui/components/combobox";

export function Default() {
  return (
    <div style={{ width: 280 }}>
      <Combobox defaultOpen>
        <ComboboxInput placeholder="Search artists…" />
        <ComboboxContent>
          <ComboboxEmpty>No artists found.</ComboboxEmpty>
          <ComboboxList>
            <ComboboxItem value="daft-punk">Daft Punk</ComboboxItem>
            <ComboboxItem value="justice">Justice</ComboboxItem>
            <ComboboxItem value="kavinsky">Kavinsky</ComboboxItem>
            <ComboboxItem value="m83">M83</ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
