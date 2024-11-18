import { defineRecipe } from '@chakra-ui/react';

export const textareaRecipe = defineRecipe({
  base: {
    _focus: {
      borderColor: 'brand.500',
    },
  },
  variants: {
    visual: {
      outline: {
        bg: 'white',
        borderColor: 'gray.200',
        boxShadow: 'sm',
        _dark: {
          bg: 'whiteAlpha.50',
          borderColor: 'whiteAlpha.100',
        },
      },
    },
  },
});
