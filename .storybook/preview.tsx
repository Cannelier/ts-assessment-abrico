import React, { useEffect } from 'react';

import { Box, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Preview, ReactRenderer } from '@storybook/react';
import { themes } from '@storybook/theming';
import { useTranslation } from 'react-i18next';

import { useColorMode } from '@/components/ui/color-mode';

import i18nGlobal from '../src/lib/i18n/client';
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE_KEY,
} from '../src/lib/i18n/constants';

// @ts-ignore don't want to implement a d.ts declaration for storybook only
// @ts-ignore don't want to implement a d.ts declaration for storybook only

const DocumentationWrapper = ({ children, context, isDarkMode }) => {
  const { i18n } = useTranslation();
  const { colorMode, setColorMode } = useColorMode();

  // Update color mode
  useEffect(() => {
    // Add timeout to prevent unsync color mode between docs and classic modes
    const timer = setTimeout(() => {
      if (isDarkMode) {
        setColorMode('dark');
      } else {
        setColorMode('light');
      }
    });
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  // Update language
  useEffect(() => {
    i18n.changeLanguage(context.globals.locale);
  }, [context.globals.locale]);

  return (
    <Box
      id="start-ui-storybook-wrapper"
      p="4"
      pb="8"
      bg={colorMode === 'dark' ? 'gray.900' : 'white'}
      flex="1"
    >
      {children}
    </Box>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: DEFAULT_LANGUAGE_KEY,
      toolbar: {
        icon: 'globe',
        items: AVAILABLE_LANGUAGES.map(({ key }) => ({
          value: key,
          title: i18nGlobal.t(`languages.${String(key)}`),
        })),
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: ['StyleGuide', 'Components', 'Fields', 'App Layout'],
      },
    },
    darkMode: {
      dark: themes.dark,
      light: themes.light,
    },
    layout: 'fullscreen',
    backgrounds: { disable: true, grid: { disable: true } },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      defaultTheme: 'light',
      themes: {
        light: '',
        dark: 'dark',
      },
    }),
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default preview;
