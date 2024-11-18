import { ReactNode } from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import { Checkbox, CheckboxProps } from '@/components/ui/checkbox';

import { FieldCommonProps } from '../FormFieldController';
import { FormFieldError } from '../FormFieldError';

export type CheckboxRootProps = Pick<CheckboxProps, 'size'>;

export type FieldCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: 'checkbox';
  label?: ReactNode;
  checkboxProps?: RemoveFromType<
    RemoveFromType<
      Omit<CheckboxProps, 'checked' | 'disabled' | 'children'>,
      CheckboxRootProps
    >,
    ControllerRenderProps
  >;
  containerProps?: FlexProps;
} & CheckboxRootProps &
  FieldCommonProps<TFieldValues, TName>;

export const FieldCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldCheckboxProps<TFieldValues, TName>
) => {
  return (
    <Controller
      {...props}
      render={({ field: { value, ...field } }) => (
        <Flex flexDirection="column" gap={1} flex={1} {...props.containerProps}>
          <Checkbox
            size={props.size}
            checked={!!value}
            disabled={props.disabled}
            {...props.checkboxProps}
            {...field}
          >
            {props.label}
          </Checkbox>
          <FormFieldError />
        </Flex>
      )}
    />
  );
};
