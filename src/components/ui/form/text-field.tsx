import { Input } from '../input';
import { useFieldContext } from './context';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './field-components';

type TextFieldProps = {
  label?: string;
  description?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'onBlur'
>;

function TextField(props: TextFieldProps) {
  return (
    <FormItem>
      <TextFieldInner {...props} />
    </FormItem>
  );
}

function TextFieldInner({ label, description, ...props }: TextFieldProps) {
  const { field } = useFieldContext<string>();

  return (
    <>
      {!!label && <FormLabel>Household Name</FormLabel>}

      <FormControl>
        <Input
          {...props}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </FormControl>

      {!!description && <FormDescription>{description}</FormDescription>}

      <FormMessage />
    </>
  );
}
export { TextField };
export type { TextFieldProps };
