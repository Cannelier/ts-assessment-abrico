import React from 'react';

import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { Logo } from '@/components/Logo';
import { AppLayoutPage } from '@/features/app/AppLayoutPage';

export default function PageHome() {
  const { t } = useTranslation(['appHome', 'account']);

  return (
    <AppLayoutPage>
      <Stack flex={1} gap={6}>
        <Flex
          display={{ base: 'flex', md: 'none' }}
          py={2}
          alignItems="center"
          justifyContent="center"
        >
          <Logo />
        </Flex>

        <Stack>
          <Heading fontSize="lg">{t('appHome:welcome.title')}</Heading>
          <Text display="block">
            {t('appHome:welcome.description')}
            <br />
          </Text>
        </Stack>
      </Stack>
    </AppLayoutPage>
  );
}
