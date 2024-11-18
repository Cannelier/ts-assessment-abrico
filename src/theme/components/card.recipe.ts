import { cardAnatomy as parts } from '@chakra-ui/anatomy';
import { defineSlotRecipe } from '@chakra-ui/react';

export const cardRecipe = defineSlotRecipe({
  slots: parts.keys,
  variants: {
    visual: {
      elevated: {
        container: {
          _dark: {
            bg: 'colors.gray.800',
          },
        },
      },

      filled: {
        container: {
          _dark: {
            bg: 'colors.gray.900',
          },
        },
      },
    },
  },
  base: {
    container: {
      boxShadow: 'card',
    },
  },
});
