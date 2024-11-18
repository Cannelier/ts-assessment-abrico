import React from 'react';

import { Text } from '@chakra-ui/react';
import { LuUser } from 'react-icons/lu';

import { Icon } from '.';

export default {
  title: 'Components/Icons',
};

export const ReactIcons = () => (
  <Text>
    This is a LuUser <Icon icon={LuUser} /> icon from react-icons.
  </Text>
);
