import React from 'react';

import { Badge, Box, HStack, Portal } from '@chakra-ui/react';
import { LuActivity, LuChevronDown, LuTrash2 } from 'react-icons/lu';

import { Icon } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';

import { ConfirmMenuItem } from './';

export default {
  title: 'Components/ConfirmMenuItem',
};

export const Default = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem
            onClick={() => {
              alert('Action');
            }}
          >
            Confirm Action
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const MenuItemLongText = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>
      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem>
            Confirm Action with long texts, lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc sed pellentesque lorem, id dictum
            odio.
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const ConfirmText = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>
      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem confirmText="Custom Confirm">
            Confirm Action
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const ConfirmTextLong = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem
            confirmText="Confirm with long texts, lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed
            pellentesque lorem, id dictum odio."
          >
            Confirm Action
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const ConfirmMenuItemIcon = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem
            icon={<Icon icon={LuTrash2} fontSize="lg" color="gray.400" />}
          >
            Confirm Action
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const ConfirmIcon = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem confirmIcon={LuActivity}>
            Confirm Action
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const ConfirmContent = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem
            confirmContent={
              <HStack>
                <Box>Confirmation</Box>
                <Badge>Something</Badge>
              </HStack>
            }
          >
            Confirm Action
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const ConfirmColorScheme = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem confirmColorScheme="green">
            Confirm Action
          </ConfirmMenuItem>
          <MenuItem value="action-2">Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};

export const ConfirmDelay = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button>
          <Icon icon={LuChevronDown} />
          Actions
        </Button>
      </MenuTrigger>

      <Portal>
        <MenuContent>
          <MenuItem value="action-1">Action</MenuItem>
          <ConfirmMenuItem confirmDelay={5000}>Confirm Action</ConfirmMenuItem>
          <MenuItem value="action-2"> Action</MenuItem>
        </MenuContent>
      </Portal>
    </MenuRoot>
  );
};
