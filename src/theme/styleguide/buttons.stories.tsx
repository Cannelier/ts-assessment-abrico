import { Group, IconButton } from '@chakra-ui/react';
import { LuMinus, LuPlus } from 'react-icons/lu';

import { Button } from '@/components/ui/button';

export default {
  title: 'StyleGuide/Buttons',
};

export const Default = () => (
  <Group>
    <Button>Default Button</Button>
    <Button loading loadingText="Processing...">
      Button
    </Button>
    <IconButton aria-label="Add">
      <LuPlus />
    </IconButton>
    <Button disabled>Button</Button>
  </Group>
);
export const Primary = () => (
  <Group>
    <Button visual="@primary">Primary Button</Button>
    <Button visual="@primary" loading loadingText="Processing...">
      Button
    </Button>
    <IconButton visual="@primary" aria-label="Add">
      <LuPlus />
    </IconButton>
    <Button visual="@primary" disabled>
      Button
    </Button>
  </Group>
);

export const Secondary = () => (
  <Group>
    <Button visual="@secondary">Secondary Button</Button>
    <Button visual="@secondary" loading loadingText="Processing...">
      Button
    </Button>
    <IconButton visual="@secondary" aria-label="Add">
      <LuPlus />
    </IconButton>
    <Button visual="@secondary" disabled>
      Button
    </Button>
  </Group>
);
export const DangerPrimary = () => (
  <Group>
    <Button visual="@dangerPrimary">Danger Primary Button</Button>
    <Button visual="@dangerPrimary" loading loadingText="Processing...">
      Button
    </Button>
    <IconButton visual="@dangerPrimary" aria-label="Remove">
      <LuMinus />
    </IconButton>
    <Button visual="@dangerPrimary" disabled>
      Button
    </Button>
  </Group>
);

export const DangerSecondary = () => (
  <Group>
    <Button visual="@dangerSecondary">Danger Secondary Button</Button>
    <Button visual="@dangerSecondary" loading loadingText="Processing...">
      Button
    </Button>
    <IconButton visual="@dangerSecondary" aria-label="Remove">
      <LuMinus />
    </IconButton>
    <Button visual="@dangerSecondary" disabled>
      Button
    </Button>
  </Group>
);

export const Link = () => (
  <Group>
    <Button visual="link">Link Button</Button>
    <Button visual="link" loading loadingText="Processing...">
      Button
    </Button>
    <IconButton visual="link" aria-label="Remove">
      <LuMinus />
    </IconButton>
    <Button visual="link" disabled>
      Button
    </Button>
  </Group>
);
