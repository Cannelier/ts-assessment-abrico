import { alertAnatomy } from '@chakra-ui/anatomy';
import { defineSlotRecipe } from '@chakra-ui/react';

export const alertRecipe = defineSlotRecipe({
  slots: alertAnatomy.keys,
  base: {
    container: {
      py: 2,
      borderRadius: 'md',
      fontSize: 'sm',
      flexWrap: 'wrap',
    },
    title: {
      lineHeight: 6,
      marginEnd: 2,
    },
    description: {
      lineHeight: 5,
    },
    icon: {
      marginEnd: 2,
    },
    spinner: {
      marginEnd: 2,
    },
  },
  variants: {
    visual: {
      subtle: {
        container: {
          // bg: bg.light,
          color: `colorPalette.800`,
          _dark: {
            // bg: bg.dark,
            color: `colorPalette.200`,
          },
        },
        icon: {
          color: `colorPalette.500`,
          _dark: {
            color: `colorPalette.200`,
          },
        },
        spinner: {
          color: `colorPalette.500`,
          _dark: {
            color: `colorPalette.200`,
          },
        },
      },
      'left-accent': {
        container: {
          paddingStart: 3,
          borderStartWidth: '4px',
          borderStartColor: `colorPalette.500`,
          // bg: bg.light,
          _dark: {
            // bg: bg.dark,
            borderStartColor: `colorPalette.200`,
          },
        },
        icon: {
          color: `colorPalette.500`,
          _dark: {
            color: `colorPalette.200`,
          },
        },
        spinner: {
          color: `colorPalette.500`,
          _dark: {
            color: `colorPalette.200`,
          },
        },
      },
      'top-accent': {
        container: {
          pt: 2,
          borderTopWidth: '4px',
          borderTopColor: `colorPalette.500`,
          // bg: getBg(props),
          _dark: {
            borderTopColor: `colorPalette.200`,
          },
        },
        icon: {
          color: `colorPalette.500`,
          _dark: {
            color: `colorPalette.200`,
          },
        },
        spinner: {
          color: `colorPalette.500`,
          _dark: {
            color: `colorPalette.200`,
          },
        },
      },
      solid: {
        container: {
          bg: `colorPalette.500`,
          color: 'white',
          _dark: {
            bg: `colorPalette.200`,
            color: 'gray.900',
          },
        },
      },
    },
  },
  defaultVariants: {
    visual: 'subtle',
    colorPalette: 'blue',
  },
});
