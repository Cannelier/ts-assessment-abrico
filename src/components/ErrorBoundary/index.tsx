import React, { FC } from 'react';

import { Box, Button, useDisclosure } from '@chakra-ui/react';
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import { Alert } from '@/components/ui/alert';
import {
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from '@/components/ui/dialog';
import { useOpen } from '@/hooks/useOpen';

const ErrorFallback = ({ error }: FallbackProps) => {
  const errorModal = useOpen();
  const { t } = useTranslation(['components']);
  return (
    <Box p="4" m="auto">
      <Alert
        status="error"
        borderRadius="md"
        title={t('components:errorBoundary.title')}
      >
        <Box flex="1">
          <Box display="block" lineHeight="1.4">
            <Button
              size="sm"
              textDecoration="underline"
              onClick={errorModal.openIt}
              color="red.800"
              _dark={{ color: 'red.100' }}
            >
              {t('components:errorBoundary.actions.expand')}
            </Button>
            <DialogRoot
              open={errorModal.open}
              onOpenChange={errorModal.onOpenChange}
            >
              <DialogBackdrop />
              <DialogContent>
                <DialogHeader>
                  {t('components:errorBoundary.title')}
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogContent>
                  <Box fontFamily="monospace">{error.message}</Box>
                </DialogContent>
              </DialogContent>
            </DialogRoot>
          </Box>
        </Box>
      </Alert>
    </Box>
  );
};

export const ErrorBoundary: FC<React.PropsWithChildren<unknown>> = (props) => {
  return <ReactErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
};
