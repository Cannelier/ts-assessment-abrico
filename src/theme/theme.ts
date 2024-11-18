import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { alertRecipe } from '@/theme/components/alert.recipe';
import { badgeRecipe } from '@/theme/components/badge.recipe';
import { buttonRecipe } from '@/theme/components/button.recipe';
import { cardRecipe } from '@/theme/components/card.recipe';
import { checkboxRecipe } from '@/theme/components/checkbox.recipe';
import { inputRecipe } from '@/theme/components/input.recipe';
import { linkRecipe } from '@/theme/components/link.recipe';
import { modalRecipe } from '@/theme/components/modal.recipe';
import { pinInputRecipe } from '@/theme/components/pin-input';
import { popoverRecipe } from '@/theme/components/popover.recipe';
import { radioRecipe } from '@/theme/components/radio.recipe';
import { selectRecipe } from '@/theme/components/select.recipe';
import { switchRecipe } from '@/theme/components/switch.recipe';
import { textareaRecipe } from '@/theme/components/textarea.recipe';
import { colors } from '@/theme/foundations/colors';
import { shadows } from '@/theme/foundations/shadows';
import { spacing } from '@/theme/foundations/spacing';
import { typography } from '@/theme/foundations/typography';
import { zIndex } from '@/theme/foundations/z-index';

import { styles } from './styles';

const customConfig = defineConfig({
  globalCss: styles,
  theme: {
    tokens: {
      colors,
      ...typography,
      shadows,
      spacing,
      zIndex,
    },
    semanticTokens: {
      colors: {
        'text-dimmed': {
          value: {
            _light: 'gray.500',
            _dark: 'gray.400',
          },
        },
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: '{colors.brand.100}' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.200}' },
          emphasized: { value: '{colors.brand.300}' },
          focusRing: { value: '{colors.brand.500}' },
        },
      },
    },
    slotRecipes: {
      popover: popoverRecipe,
      checkbox: checkboxRecipe,
      card: cardRecipe,
      alert: alertRecipe,
    },
    recipes: {
      badge: badgeRecipe,
      link: linkRecipe,
      modal: modalRecipe,
      switch: switchRecipe,
      textarea: textareaRecipe,
      select: selectRecipe,
      radio: radioRecipe,
      input: inputRecipe,
      pinInput: pinInputRecipe,
      button: buttonRecipe,
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
