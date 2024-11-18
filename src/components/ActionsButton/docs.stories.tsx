import React from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { StoryFn } from '@storybook/react';
import { LuCopy, LuPenLine, LuTrash2, LuUserPlus } from 'react-icons/lu';

import { Icon } from '@/components/Icons';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from '@/components/ui/menu';

import { ActionsButton } from './index';

export default {
  title: 'Components/ActionsButton',
};

export const Default = () => <ActionsButton />;

export const DarkBackground = () => (
  <Box p="4" color="white" bg="gray.800">
    <ActionsButton />
  </Box>
);

export const UsageWithMenu = () => (
  <MenuRoot lazyMount positioning={{ placement: 'left-start' }}>
    <MenuTrigger as={ActionsButton} />
    <MenuContent>
      <MenuItem value="edit">
        <Icon icon={LuPenLine} fontSize="lg" color="gray.400" />
        Edit
      </MenuItem>
      <MenuItem value="duplicate">
        <Icon icon={LuCopy} fontSize="lg" color="gray.400" />
        Duplicate
      </MenuItem>
      <MenuItem value="share">
        <Icon icon={LuUserPlus} fontSize="lg" color="gray.400" />
        Share
      </MenuItem>
      <MenuSeparator />
      <MenuItem value="delete">
        <Icon icon={LuTrash2} fontSize="lg" color="gray.400" />
        Delete
      </MenuItem>
    </MenuContent>
  </MenuRoot>
);
UsageWithMenu.decorators = [
  (Story: StoryFn) => (
    <Flex h="12rem" justify="flex-end">
      <Story />
    </Flex>
  ),
];
