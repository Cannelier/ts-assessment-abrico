import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors } from '@/theme/foundations/colors';
import { shadows } from '@/theme/foundations/shadows';
import { spacing } from '@/theme/foundations/spacing';
import { typography } from '@/theme/foundations/typography';
import { zIndex } from '@/theme/foundations/z-index';

const customConfig = defineConfig({
  // globalCss: styles,
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
  },
});

export const system = createSystem(defaultConfig, customConfig);
