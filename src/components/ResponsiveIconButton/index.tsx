import { FC, forwardRef } from 'react';

import {
  Button,
  ButtonProps,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ResponsiveValue } from '@chakra-ui/styled-system';

type ResponsiveIconButtonProps = ButtonProps & {
  hideTextBreakpoints?: Omit<ResponsiveValue<boolean>, 'boolean'>;
  icon: React.ReactElement;
  children: string;
  iconPosition?: 'left' | 'right';
};

export const ResponsiveIconButton: FC<
  React.PropsWithChildren<ResponsiveIconButtonProps>
> = forwardRef(
  (
    {
      hideTextBreakpoints = {
        base: true,
        md: false,
      },
      children,
      icon,
      iconPosition = 'left',
      ...rest
    },
    ref
  ) => {
    const responsiveStates = useBreakpointValue(hideTextBreakpoints);

    const buttonProps =
      iconPosition === 'right' ? { rightIcon: icon } : { leftIcon: icon };

    return responsiveStates ? (
      // @ts-ignore
      <IconButton aria-label={children} ref={ref} {...rest}>
        {icon}
      </IconButton>
    ) : (
      // @ts-ignore
      <Button ref={ref} {...buttonProps} {...rest}>
        {children}
      </Button>
    );
  }
);
ResponsiveIconButton.displayName = 'ResponsiveIconButton';
