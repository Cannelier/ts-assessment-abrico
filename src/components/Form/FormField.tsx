import {
  ElementRef,
  ReactNode,
  createContext,
  useContext,
  useId,
  useMemo,
} from 'react';

import { Field, FieldProps } from '@/components/ui/field';
import { fixedForwardRef } from '@/lib/utils';

type FormFieldSize = 'sm' | 'md' | 'lg';

type FormFieldProps = {
  id?: string;
  size?: FormFieldSize;
  formControlProps?: FieldProps;
  children?: ReactNode;
};

const FormFieldComponent = (
  props: FormFieldProps,
  ref: ElementRef<typeof Field>
) => {
  const _id = useId();
  const id = props.id ?? _id;

  const contextValue = useMemo(
    () => ({
      id,
      size: props.size,
    }),
    [id, props.size]
  );

  return (
    <FormFieldContext.Provider value={contextValue}>
      <Field
        // @ts-ignore
        ref={ref}
        display="flex"
        flexDirection="column"
        id={id}
        gap={1}
        {...props.formControlProps}
      >
        {props.children}
      </Field>
    </FormFieldContext.Provider>
  );
};

export const FormField = fixedForwardRef(FormFieldComponent);

type FormFieldContextValue = {
  id: string;
  size?: FormFieldSize;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null
);

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  if (!fieldContext) {
    throw new Error('Missing <FormField /> parent component');
  }

  return {
    ...fieldContext,
  };
};
