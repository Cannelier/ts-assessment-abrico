import { ComponentProps } from 'react';

import { Box, DialogRootProps } from '@chakra-ui/react';
import { Sheet } from 'react-modal-sheet';

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogDescription,
  DialogRoot,
} from '@/components/ui/dialog';

export type SheetModalProps = Pick<
  ComponentProps<typeof Sheet>,
  'isOpen' | 'onClose' | 'children'
> & { size?: DialogRootProps['size'] };
export const SheetModal = (props: SheetModalProps) => {
  return (
    <>
      <Box
        as={Sheet}
        css={{
          '.react-modal-sheet-backdrop': {
            display: { base: 'flex', sm: 'none !important' },
            backdropFilter: 'blur(4px)',
            background: 'rgba(0,0,0,0.4) !important',
          },
          '.react-modal-sheet-container': {
            display: { base: 'flex', sm: 'none !important' },
            background: 'white !important',
          },
          // '.react-modal-sheet-header': {},
          // '.react-modal-sheet-drag-indicator': {},
          '.react-modal-sheet-content': {
            px: 4,
            pb: 12,
          },
          _dark: {
            '.react-modal-sheet-container': {
              background: 'gray.800 !important',
            },
          },
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{props.children}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Box>
      <DialogRoot
        size={props.size ?? 'xs'}
        open={props.isOpen}
        onOpenChange={props.isOpen ? undefined : props.onClose}
      >
        <DialogBackdrop display={{ base: 'none', sm: 'flex' }} />
        <DialogBody display={{ base: 'none', sm: 'flex' }}>
          <DialogCloseTrigger />
          <DialogDescription>{props.children}</DialogDescription>
        </DialogBody>
      </DialogRoot>{' '}
    </>
  );
};
