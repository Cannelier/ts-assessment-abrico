import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { defineSlotRecipe } from '@chakra-ui/react';

export const checkboxRecipe = defineSlotRecipe({
  slots: checkboxAnatomy.keys,
  base: {
    label: { colorScheme: 'brand' },
    container: { colorScheme: 'brand' },
    control: { colorScheme: 'brand' },
    icon: { colorScheme: 'brand' },
  },
});
