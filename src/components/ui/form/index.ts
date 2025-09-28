import { createFormHook } from '@tanstack/react-form';
import { fieldContext, formContext } from './context';
import * as fieldComponents from './field-components';
import * as formComponents from './form-components';
import { TextField } from './text-field';

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    ...fieldComponents,
    TextField,
  },
  formComponents,
});
