import { defineRecipe } from '@chakra-ui/react';

export const inputRecipe = defineRecipe({
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
          _disabled: {
            bg: 'blackAlpha.50',
            color: 'blackAlpha.600',
            opacity: 1,
            boxShadow: 'none',
            _dark: {
              color: 'whiteAlpha.600',
              bg: 'transparent',
            },
          },
        },
      },
    },
    size: {
      sm: {
        field: {
          borderRadius: 'md',
        },
      },
    },
  },
});
