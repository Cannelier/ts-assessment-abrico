import * as React from 'react';

import { Field as ChakraField, Flex } from '@chakra-ui/react';
import { SlideFade } from '@chakra-ui/transition';
import { LuAlertCircle } from 'react-icons/lu';

import { Icon } from '@/components/Icons';

export interface FieldProps extends Omit<ChakraField.RootProps, 'label'> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  errorText?: React.ReactNode;
  optionalText?: React.ReactNode;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, children, helperText, errorText, optionalText, ...rest } =
      props;

    return (
      <ChakraField.Root ref={ref} {...rest}>
        {label && (
          <ChakraField.Label>
            {label}
            <ChakraField.RequiredIndicator fallback={optionalText} />
          </ChakraField.Label>
        )}
        {children}
        {helperText && (
          <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
        )}
        {errorText && (
          <SlideFade in offsetY={-6}>
            <Flex fontSize="sm" color="error.500" ref={ref}>
              <Icon icon={LuAlertCircle} me="2" />
              <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
            </Flex>
          </SlideFade>
        )}
      </ChakraField.Root>
    );
  }
);
