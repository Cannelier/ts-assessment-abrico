import { defineRecipe } from '@chakra-ui/react';

export const linkRecipe = defineRecipe({
  base: {
    textDecoration: 'underline',
    fontWeight: 'medium',
    _hover: {
      textDecoration: 'none',
    },
  },
});
