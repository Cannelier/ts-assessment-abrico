import React, { ReactElement, ReactNode, useRef } from 'react';

import { Group, Heading, Popover, Portal } from '@chakra-ui/react';
import FocusLock from 'react-focus-lock';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useOpen } from '@/hooks/useOpen';

type ConfirmPopoverProps = Omit<Popover.RootProviderProps, 'value'> & {
  isEnabled?: boolean;
  children: ReactElement;
  title?: ReactNode;
  message?: ReactNode;
  onConfirm(): void;
  confirmText?: ReactNode;
  confirmVariant?:
    | '@primary'
    | '@secondary'
    | '@dangerPrimary'
    | '@dangerSecondary';
  cancelText?: ReactNode;
};

export const ConfirmPopover: React.FC<
  React.PropsWithChildren<ConfirmPopoverProps>
> = ({
  isEnabled = true,
  children,
  title,
  message,
  onConfirm,
  confirmText,
  confirmVariant = '@primary',
  cancelText,
  ...rest
}) => {
  const { t } = useTranslation(['common', 'components']);
  const confirmPopover = useOpen();

  const displayHeading =
    !title && !message ? t('components:confirmPopover.heading') : title;

  const initialFocusRef = useRef<HTMLButtonElement>(null);

  if (!isEnabled) {
    const childrenWithOnClick = React.cloneElement(children, {
      onClick: onConfirm,
    });
    return <>{childrenWithOnClick}</>;
  }

  return (
    <>
      <PopoverRoot
        lazyMount
        open={confirmPopover.open}
        onOpenChange={confirmPopover.onOpenChange}
        initialFocusEl={() => initialFocusRef.current!}
        {...rest}
      >
        <PopoverTrigger>{children}</PopoverTrigger>
        <Portal>
          <PopoverContent>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverBody fontSize="sm">
                {displayHeading && (
                  <Heading size="sm" mb={message ? 1 : 0}>
                    {displayHeading}
                  </Heading>
                )}
                {message}
              </PopoverBody>
              <PopoverFooter>
                <Group justifyContent="space-between" w="full">
                  <Button onClick={confirmPopover.closeIt}>
                    {cancelText ?? t('common:actions.cancel')}
                  </Button>
                  <Button
                    visual={confirmVariant}
                    onClick={() => {
                      onConfirm();
                      confirmPopover.closeIt();
                    }}
                    ref={initialFocusRef}
                  >
                    {confirmText ?? t('components:confirmPopover.confirmText')}
                  </Button>
                </Group>
              </PopoverFooter>
            </FocusLock>
          </PopoverContent>
        </Portal>
      </PopoverRoot>
    </>
  );
};
