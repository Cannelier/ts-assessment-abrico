'use client';

import { ReactNode } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Providers } from '@/app/Providers';
import { Viewport } from '@/components/Viewport';
import { EnvHint } from '@/features/devtools/EnvHint';
// import { useLocale } from '@/lib/i18n/useLocale';
import { TrpcProvider } from '@/lib/trpc/TrpcProvider';

export const Document = ({ children }: { children: ReactNode }) => {
  // const locale = useLocale();

  return (
    <html suppressHydrationWarning={true}>
      <head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" />
        <meta name="msapplication-TileColor" content="gray.800" />
        <meta name="theme-color" />
      </head>
      <body>
        <Providers>
          <TrpcProvider>
            <Viewport>{children}</Viewport>
            <EnvHint />
            <ReactQueryDevtools initialIsOpen={false} />
          </TrpcProvider>
        </Providers>
      </body>
    </html>
  );
};
