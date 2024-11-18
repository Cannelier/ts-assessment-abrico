import { defineRecipe } from '@chakra-ui/react';

const getVariantPrimary = (palette: string) => ({
  bg: `${palette}.600`,
  color: 'white',
  _hover: {
    bg: `${palette}.700`,
    color: 'white',
    _disabled: {
      bg: `${palette}.600`,
      color: 'white',
    },
  },
  _active: { bg: `${palette}.800` },
  _focusVisible: {
    ringColor: `${palette}.500`,
  },

  _dark: {
    bg: `${palette}.300`,
    color: `${palette}.900`,
    _hover: {
      bg: `${palette}.400`,
      color: `${palette}.900`,
      _disabled: {
        bg: `${palette}.300`,
        color: `${palette}.900`,
      },
    },
    _active: {
      bg: `${palette}.500`,
    },
  },
});

const getVariantSecondary = (palette: string) => ({
  bg: 'white',
  color: `${palette}.600`,
  border: '1px solid',
  borderColor: 'gray.200',
  _hover: {
    bg: `${palette}.50`,
    borderColor: `${palette}.200`,
    _disabled: {
      bg: 'white',
      borderColor: 'gray.200',
    },
  },
  _active: {
    bg: `${palette}.100`,
  },
  _focusVisible: {
    ringColor: `${palette}.500`,
  },

  _dark: {
    bg: 'gray.800',
    color: `${palette}.400`,
    borderColor: 'gray.700',
    _hover: {
      bg: 'gray.900',
      borderColor: `${palette}.700`,
      _disabled: {
        bg: 'gray.800',
        borderColor: 'gray.700',
      },
    },
    _active: {
      bg: 'gray.800',
    },
  },
});

export const buttonRecipe = defineRecipe({
  base: {
    fontWeight: 'medium',
    boxShadow: 'sm',
    border: '1px solid transparent',
    _focusVisible: {
      boxShadow: 'none',
      ring: '2px',
      ringOffset: '2px',
      ringColor: `colorPalette.500`,
    },
    _disabled: {
      opacity: 0.8,
      border: '1px solid!',
      bg: 'blackAlpha.50!',
      borderColor: 'blackAlpha.50!',
      color: 'blackAlpha.300!',
      _dark: {
        opacity: 1,
        bg: 'whiteAlpha.50!',
        borderColor: 'whiteAlpha.50!',
        color: 'whiteAlpha.300!',
      },
    },
  },
  variants: {
    visual: {
      '@primary': getVariantPrimary('brand'),
      '@dangerPrimary': getVariantPrimary('error'),
      '@secondary': getVariantSecondary('barnd'),
      '@dangerSecondary': getVariantSecondary('error'),
      // Default variants
      link: {
        boxShadow: 'none',
        _disabled: {},
      },
      unstyled: {
        boxShadow: 'none',
      },
    },
  },
});
