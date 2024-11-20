import React, { ReactNode } from 'react';

import {
  Box,
  BoxProps,
  Container,
  Flex,
  HStack,
  LinkOverlay,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LuHome } from 'react-icons/lu';

import { Icon } from '@/components/Icons';
import { Logo } from '@/components/Logo';
import { ROUTES_APP } from '@/features/app/routes';
import { ROUTES_AUTH } from '@/features/auth/routes';

export const AppNavBarDesktop = (props: BoxProps) => {
  const { t } = useTranslation(['app']);

  return (
    <Box display={{ base: 'none', md: 'block' }} {...props}>
      <Box w="full" h="0" pb="safe-top" />
      <Flex align="center" pt={6} pb={2}>
        <Container maxW="container.md">
          <HStack gap={4}>
            <Logo maxW={100} />
            <HStack flex={1} gap={0}>
              <AppNavBarDesktopMainMenuItem
                href={ROUTES_APP.root()}
                isExact
                icon={LuHome}
              >
                {t('app:layout.mainMenu.home')}
              </AppNavBarDesktopMainMenuItem>
              <NextLink href={ROUTES_AUTH.logout()}>Logout</NextLink>
            </HStack>
          </HStack>
        </Container>
      </Flex>
    </Box>
  );
};

const AppNavBarDesktopMainMenuItem = ({
  children,
  href,
  icon,
  isExact,
}: {
  children: ReactNode;
  href: string;
  isExact?: boolean;
  icon?: React.FC;
}) => {
  const pathname = usePathname() ?? '';
  const isActive = isExact ? pathname === href : pathname.startsWith(href);

  return (
    <Flex
      bg="transparent"
      justifyContent="flex-start"
      position="relative"
      opacity={isActive ? 1 : 0.6}
      fontWeight="semibold"
      borderRadius="md"
      px={3}
      py={1.5}
      gap={1.5}
      transition="0.2s"
      _hover={{
        bg: 'gray.200',
      }}
      _dark={{
        _hover: {
          bg: 'gray.800',
        },
      }}
    >
      {children}
    </Flex>
  );
};
