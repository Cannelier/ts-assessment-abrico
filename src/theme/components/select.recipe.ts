import { defineRecipe } from '@chakra-ui/react';

export const selectRecipe = defineRecipe({
  base: {
    _focus: {
      borderColor: 'brand.500',
    },
  },
  variants: {
    visual: {
      outline: {
        field: {
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
  },
});
