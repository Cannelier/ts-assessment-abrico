import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { MenuRootProps } from '@ark-ui/react';
import {
  ChakraComponent,
  Flex,
  FlexProps,
  Group,
  Portal,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';

import { MenuItem } from '@/components/ConfirmMenuItem';
import { Icon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { useIsHydrated } from '@/hooks/useIsHydrated';

type NavContextValue = {
  active: ReactNode;
  setActive: (active: ReactNode) => void;
  isMenu: boolean;
};

const NavContext = React.createContext<NavContextValue>({
  active: '',
  setActive: () => undefined,
  isMenu: false,
});
const useNavContext = () => React.useContext(NavContext);

type NavProps = React.PropsWithChildren<MenuRootProps> & {
  breakpoint?: string;
};

export const Nav = ({ children, breakpoint = 'lg', ...rest }: NavProps) => {
  const isHydrated = useIsHydrated();
  const isMenu = useBreakpointValue({
    base: true,
    [breakpoint]: false,
  });

  const [active, setActive] = useState<ReactNode>(<>-</>);
  return (
    <NavContext.Provider value={{ active, setActive, isMenu: !!isMenu }}>
      <MenuRoot matchWidth {...rest}>
        {!isMenu && (
          <Stack gap="1" opacity={!isHydrated ? 0 : undefined}>
            {children}
          </Stack>
        )}
        {isMenu && (
          <>
            <MenuTrigger asChild>
              <Button
                opacity={!isHydrated ? 0 : undefined}
                textAlign="left"
                css={{ '> *': { minW: 0 } }}
              >
                <Icon icon={LuChevronDown} />
                {active}
              </Button>
            </MenuTrigger>

            <Portal>{children}</Portal>
          </>
        )}
      </MenuRoot>
    </NavContext.Provider>
  );
};

type NavItemProps = FlexProps & {
  icon?: React.FC<React.PropsWithChildren<unknown>>;
  isActive?: boolean;
};

export const NavItem: ChakraComponent<'span', NavItemProps> = ({
  children,
  icon,
  isActive = false,
  ...rest
}) => {
  const { setActive, isMenu } = useNavContext();
  const Item: TODO = isMenu ? MenuItem : Flex;

  const itemContent = useMemo(
    () => (
      <Flex as="span" align="center" minW="0">
        {icon && (
          <Icon
            icon={icon}
            mt="0.05rem"
            me="2"
            fontSize="lg"
            color={isActive ? 'brand.500' : 'gray.400'}
            _dark={{ color: isActive ? 'brand.300' : 'gray.400' }}
          />
        )}
        <Text as="span" lineClamp={isMenu ? 1 : 2}>
          {children}
        </Text>
      </Flex>
    ),
    [icon, children, isActive, isMenu]
  );

  useEffect(() => {
    if (isActive) {
      setActive(itemContent);
    }
  }, [isActive, setActive, itemContent]);

  return (
    <Item
      px="3"
      py="1"
      borderRadius={isMenu ? undefined : 'md'}
      transition="0.2s"
      fontSize="sm"
      fontWeight="bold"
      bg={isActive ? 'white' : 'transparent'}
      border="1px solid transparent"
      boxShadow={isActive ? 'card' : undefined}
      color={isActive ? 'gray.700' : 'gray.600'}
      borderColor={isActive ? 'gray.100' : undefined}
      borderLeft={isMenu ? 'none' : undefined}
      borderRight={isMenu ? 'none' : undefined}
      _dark={{
        color: isActive ? 'white' : 'gray.100',
        borderColor: isActive ? 'gray.800' : undefined,
        bg: isActive ? 'gray.800' : 'transparent',
      }}
      _hover={
        !isActive && !isMenu
          ? {
              bg: 'white',
              color: 'gray.700',
              boxShadow: 'card',
              borderColor: 'gray.100',
              _dark: {
                bg: 'gray.700',
                color: 'gray.100',
                borderColor: 'gray.800',
              },
            }
          : {}
      }
      {...rest}
    >
      {itemContent}
    </Item>
  );
};

export const NavGroup: FC<React.PropsWithChildren<FlexProps>> = ({
  children,
  title,
  ...rest
}) => {
  const { isMenu } = useNavContext();

  if (isMenu) {
    // @ts-ignore
    return <Group {...rest}>{children}</Group>;
  }
  return (
    <Flex direction="column">
      <Flex
        fontSize="xs"
        fontWeight="bold"
        px="3"
        pt="6"
        pb="2"
        color="text-dimmed"
        {...rest}
      >
        {title}
      </Flex>
      <Stack gap="1">{children}</Stack>
    </Flex>
  );
};
