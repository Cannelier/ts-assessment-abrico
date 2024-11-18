import React, { ReactElement, ReactNode } from 'react';

import { Group, Heading, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { SheetModal, SheetModalProps } from '@/components/SheetModal';
import { Button } from '@/components/ui/button';

type ConfirmModalProps = Omit<SheetModalProps, 'isOpen' | 'onClose'> & {
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

export const ConfirmModal: React.FC<
  React.PropsWithChildren<ConfirmModalProps>
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
  const confirmModal = useDisclosure();

  const displayHeading =
    !title && !message ? t('components:confirmModal.heading') : title;

  if (!isEnabled) {
    const childrenWithOnClick = React.cloneElement(children, {
      onClick: onConfirm,
    });
    return <>{childrenWithOnClick}</>;
  }

  const childrenWithOnOpen = React.cloneElement(children, {
    onClick: confirmModal.onOpen,
  });

  return (
    <>
      {childrenWithOnOpen}
      <SheetModal
        isOpen={confirmModal.open}
        onClose={confirmModal.onClose}
        {...rest}
      >
        <Stack gap={4}>
          <Stack>
            {displayHeading && (
              <Heading size="sm" mb={message ? 1 : 0}>
                {displayHeading}
              </Heading>
            )}
            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.300' }}>
              {message}
            </Text>
          </Stack>

          <Group
            justifyContent="space-between"
            w="full"
            gap={4}
            flexDirection={{ base: 'column-reverse', sm: 'row' }}
          >
            <Button onClick={confirmModal.onClose}>
              {cancelText ?? t('common:actions.cancel')}
            </Button>
            <Button
              visual={confirmVariant}
              onClick={() => {
                onConfirm();
                confirmModal.onClose();
              }}
            >
              {confirmText ?? t('components:confirmModal.confirmText')}
            </Button>
          </Group>
        </Stack>
      </SheetModal>
    </>
  );
};
