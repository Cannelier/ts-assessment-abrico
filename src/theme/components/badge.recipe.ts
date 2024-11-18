import { defineRecipe } from '@chakra-ui/react';

export const badgeRecipe = defineRecipe({
  variants: {
    size: {
      xs: {
        fontSize: '0.6em',
      },
      sm: {
        fontSize: '0.7em',
      },
      md: {
        fontSize: '0.8em',
      },
      lg: {
        fontSize: '0.9em',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
