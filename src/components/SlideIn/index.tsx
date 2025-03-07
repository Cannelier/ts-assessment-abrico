import React from 'react';

import { SlideFade, SlideFadeProps } from '@chakra-ui/transition';

export const SlideIn = ({ children, ...rest }: SlideFadeProps) => {
  return (
    <SlideFade
      in
      offsetY={-20}
      style={{ display: 'flex', minWidth: 0, flex: 1, flexDirection: 'column' }}
      {...rest}
    >
      {children}
    </SlideFade>
  );
};
