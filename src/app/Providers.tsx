import React, { FC } from 'react';

import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

import { Provider } from '@/components/ui/provider';
import '@/lib/dayjs/config';
import '@/lib/i18n/client';

export const Providers: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <>
      <Provider>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster position="top-right" offset={16} />
      </Provider>
    </>
  );
};
