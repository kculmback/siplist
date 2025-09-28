import { Button } from '../button';
import { useFormContext } from './context';

function SubmitButton({ children }: { children: React.ReactNode }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button disabled={isSubmitting}>{children}</Button>}
    </form.Subscribe>
  );
}

export { SubmitButton };
