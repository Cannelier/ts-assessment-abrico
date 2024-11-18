import React, { FC } from 'react';

import { CacheProvider } from '@chakra-ui/next-js';
import { Toaster } from 'sonner';

import { Provider } from '@/components/ui/provider';
import '@/lib/dayjs/config';
import '@/lib/i18n/client';

export const Providers: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  return (
    <CacheProvider>
      <Provider>
        {children}
        <Toaster position="top-right" offset={16} />
      </Provider>
    </CacheProvider>
  );
};
