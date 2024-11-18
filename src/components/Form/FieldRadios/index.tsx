import { ReactNode } from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
} from 'react-hook-form';

import { FieldCommonProps } from '@/components/Form/FormFieldController';
import { FormFieldError } from '@/components/Form/FormFieldError';
import { Radio, RadioGroup, RadioProps } from '@/components/ui/radio';

export type FieldRadiosProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  type: 'radios';
  rowGap?: FlexProps['rowGap'];
  columnGap?: FlexProps['columnGap'];
  direction?: FlexProps['direction'];
  options?: Readonly<
    Readonly<{
      label: string;
      value: PathValue<TFieldValues, TName>[number];
    }>[]
  >;
  children?: ReactNode;
  radioProps?: Omit<RadioProps, 'value' | 'children'>;
  containerProps?: FlexProps;
} & FieldCommonProps<TFieldValues, TName>;

export const FieldRadios = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FieldRadiosProps<TFieldValues, TName>
) => {
  return (
    <Controller
      {...props}
      render={({ field: { ref: _ref, ...field } }) => (
        <Flex flexDirection="column" gap={1} flex={1} {...props.containerProps}>
          <RadioGroup disabled={props.disabled} size={props.size} {...field}>
            {!!props.options && (
              <Flex
                columnGap={props.columnGap ?? 4}
                rowGap={props.rowGap ?? 1.5}
                direction={props.direction ?? 'column'}
              >
                {props.options.map((option) => (
                  <Radio
                    key={option.value}
                    value={option.value}
                    {...props.radioProps}
                  >
                    {option.label}
                  </Radio>
                ))}
              </Flex>
            )}
            {props.children}
          </RadioGroup>
          <FormFieldError />
        </Flex>
      )}
    />
  );
};
