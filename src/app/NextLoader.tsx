'use client';

import HolyLoader from 'holy-loader';

export type NextLoaderProps = {
  darkColor?: string;
  lightColor?: string;
  showSpinner?: boolean;
};
export const NextLoader = ({
  lightColor = 'gray.900',
  darkColor = 'gray.300',
  showSpinner = false,
}: NextLoaderProps) => {
  return (
    <HolyLoader
      height={2}
      zIndex={99999}
      color={'colorScheme.900'}
      showSpinner={showSpinner}
    />
  );
};
