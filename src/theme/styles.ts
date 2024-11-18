import { SystemStyleObject } from '@chakra-ui/react';

export const styles: Record<string, SystemStyleObject> = {
  html: {
    bg: 'gray.900',
  },
  body: {
    WebkitTapHighlightColor: 'transparent',
    bg: 'white',
    _dark: {
      bg: 'gray.900',
    },
  },
  '#chakra-toast-portal > *': {
    pt: 'safe-top',
    pl: 'safe-left',
    pr: 'safe-right',
    pb: 'safe-bottom',
  },
  form: {
    display: 'flex',
    flexDir: 'column',
    flex: 1,
  },
};
