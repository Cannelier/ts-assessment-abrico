import { useCallback, useState } from 'react';

export function useOpen(): {
  open: boolean;
  onOpenChange: (details: { open: boolean }) => void;
  closeIt: () => void;
  openIt: () => void;
} {
  const [open, setOpen] = useState<boolean>(false);

  const onOpenChange = useCallback(
    (details: { open: boolean }) => setOpen(details.open),
    []
  );

  const closeIt = useCallback(() => setOpen(false), []);
  const openIt = useCallback(() => setOpen(true), []);

  return { open, onOpenChange, closeIt, openIt };
}
