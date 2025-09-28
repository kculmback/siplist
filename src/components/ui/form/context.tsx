import { createFormHookContexts, useStore } from '@tanstack/react-form';
import { createContext, useContext } from 'react';

const {
  fieldContext,
  formContext,
  useFieldContext: _useFieldContext,
  useFormContext,
} = createFormHookContexts();

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function useFieldContext<T = unknown>() {
  const { id } = useContext(FormItemContext);
  const fieldContext = _useFieldContext<T>();

  const errors = useStore(fieldContext.store, (state) => state.meta.errors);
  if (!fieldContext) {
    throw new Error('useFieldContext should be used within <FormItem>');
  }

  return {
    id,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    errors,
    field: fieldContext,
  };
}

export {
  fieldContext,
  formContext,
  FormItemContext,
  useFieldContext,
  useFormContext,
};
