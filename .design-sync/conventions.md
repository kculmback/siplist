# siplist UI — design conventions

## Styling: Tailwind v4 (CSS-first)

Components are styled with **Tailwind v4 utility classes** inlined in source. There is no CSS Modules or styled-components layer. Use design tokens via CSS variables (see Tokens below) for any layout glue you add around components.

The build uses `@siplist/tailwind-config` — the same Tailwind theme is injected at the top of every design's CSS so all `text-foreground`, `bg-primary`, spacing, radius, etc. utilities work out of the box.

## Design tokens

All colour, radius, and spacing tokens are available as CSS variables on `:root`. Key ones:

| Variable | Usage |
|---|---|
| `--background` / `--foreground` | Page background and default text |
| `--primary` / `--primary-foreground` | Brand teal — button fill, checked states |
| `--muted` / `--muted-foreground` | Subtle backgrounds and secondary labels |
| `--border` | Default border colour |
| `--input` | Input border colour |
| `--destructive` | Red — delete / error states |
| `--radius` | Base border-radius (components multiply this) |

Font: **Source Sans 3** (variable, 300–900). Set on `body` automatically; use `font-sans` to apply it inside a component.

## ThemeProvider

Wrap any subtree that uses CSS-variable tokens in `<ThemeProvider>`. All colours above resolve against the provider's current theme (light or dark). **Never render themed components without ThemeProvider in a design** — token values will be absent and the component will render unstyled.

```jsx
<ThemeProvider>
  <YourLayout>…</YourLayout>
</ThemeProvider>
```

`ThemeToggle` must also live inside a `ThemeProvider`.

## base-ui composition rules

Several components are built on `@base-ui/react` and have mandatory context requirements:

- `DropdownMenuLabel` (and all `Menu.GroupLabel` wrappers) **must** be inside `<DropdownMenuGroup>`. Omitting the group causes a silent render failure.
- `DropdownMenuTrigger` renders as a native `<button>` — style it with `className`, not with the `render` prop. The `render` prop only reliably accepts native HTML elements.
- `Popover`, `Select`, `Combobox`, and `DropdownMenu` all use portals — their open state renders into `document.body`. Use `defaultOpen` on the root component to show the open state in designs.

## Overlay / popup patterns

For components that render floating content (Popover, DropdownMenu, Select, Combobox), show the **open state** so users can see the full component:

```jsx
// Popover
<Popover defaultOpen>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>

// DropdownMenu
<DropdownMenu defaultOpen>
  <DropdownMenuTrigger className="…">Options</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>Section</DropdownMenuLabel>
      <DropdownMenuItem>…</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

## Calendar dates

Use explicit `Date` objects for selected/range values. When writing designs, use real future dates so the calendar does not show a grayed-out month.
