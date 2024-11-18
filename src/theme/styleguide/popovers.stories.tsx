import { Portal } from '@chakra-ui/react';

import { Button } from '@/components/ui/button';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';

export default {
  title: 'StyleGuide/Popovers',
};

export const Default = () => (
  <PopoverRoot>
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
        <PopoverFooter>
          <ButtonGroup size="sm" justifyContent="space-between" w="full">
            <Button>Cancel</Button>
            <Button visual="@primary">Action</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Portal>
  </PopoverRoot>
);

export const WithoutHeader = () => (
  <PopoverRoot>
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
        <PopoverFooter>
          <ButtonGroup size="sm" justifyContent="space-between" w="full">
            <Button>Cancel</Button>
            <Button visual="@primary">Action</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Portal>
  </PopoverRoot>
);

export const WithoutBody = () => (
  <PopoverRoot>
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverFooter>
          <ButtonGroup size="sm" justifyContent="space-between" w="full">
            <Button>Cancel</Button>
            <Button visual="@primary">Action</Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Portal>
  </PopoverRoot>
);

export const WithoutFooter = () => (
  <PopoverRoot>
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Portal>
  </PopoverRoot>
);

export const BodyOnly = () => (
  <PopoverRoot>
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
      </PopoverContent>
    </Portal>
  </PopoverRoot>
);
