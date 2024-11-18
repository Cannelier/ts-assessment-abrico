import React from 'react';

import {
  Box,
  ModalContent,
  Portal,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { Meta } from '@storybook/react';
import { Options } from 'chakra-react-select';

import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from '@/components/ui/dialog';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Select } from '.';

export default {
  title: 'components/Select',
  decorators: [
    (Story) => (
      <Box h="24rem">
        <Story />
      </Box>
    ),
  ],
} satisfies Meta;

const selectOptions = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

export const Default = () => {
  return (
    <Stack gap={2}>
      <Select size="sm" options={selectOptions} />
      <Select size="md" options={selectOptions} />
      <Select size="lg" options={selectOptions} />
    </Stack>
  );
};

export const SelectWithDefaultValue = () => {
  return <Select options={selectOptions} defaultValue={selectOptions[1]} />;
};

export const SelectWithPlaceholder = () => {
  return (
    <Select
      placeholder="Please select an option"
      noOptionsMessage={() => 'There is no options'}
    />
  );
};

export const DisabledSelect = () => {
  return <Select disabled />;
};

export const IsErrorSelect = () => {
  return <Select isInvalid />;
};

export const MultiSelect = () => {
  return <Select isMulti options={selectOptions.slice(0, 2)} />;
};

export const CreatableSelect = () => {
  return (
    <Select
      type="creatable"
      formatCreateLabel={(input) => `Add other option : "${input}"`}
      options={selectOptions.slice(0, 2)}
    />
  );
};

export const MultiCreatableSelect = () => {
  return (
    <Select isMulti type="creatable" options={selectOptions.slice(0, 2)} />
  );
};

export const NotSearchableSelect = () => {
  return <Select isSearchable={false} options={selectOptions.slice(0, 2)} />;
};

const options = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'lightgreen',
  'lightblue',
  'darkgreen',
  'darkblue',
  'yellow',
  'black',
  'white',
];

const handleLoadOptions = async (inputValue: string) => {
  // Fake API call
  return new Promise<Options<{ label: string; value: string }>>((resolve) =>
    setTimeout(
      () =>
        resolve(
          options
            .filter((option) => option.startsWith(inputValue))
            .map((option) => ({ label: option, value: option }))
        ),
      500
    )
  );
};

export const AsyncSelect = () => {
  return (
    <Select
      type="async"
      isClearable
      loadOptions={handleLoadOptions}
      defaultOptions={options.map((option) => ({
        label: option,
        value: option,
      }))}
      loadingMessage={({ inputValue }) => `Loading ${inputValue}...`}
    />
  );
};

export const AsyncCreatableSelect = () => {
  return (
    <Select
      type="async-creatable"
      isClearable
      loadOptions={handleLoadOptions}
      defaultOptions={options.map((option) => ({
        label: option,
        value: option,
      }))}
    />
  );
};

export const AsyncCreatableMultiSelect = () => {
  return (
    <Select
      type="async-creatable"
      isClearable
      loadOptions={handleLoadOptions}
      defaultOptions={options.map((option) => ({
        label: option,
        value: option,
      }))}
      isMulti
    />
  );
};

export const SelectWithSomeDisabledOptions = () => {
  return (
    <Select
      options={[
        { value: 1, label: 'Option 1' },
        { value: 2, label: 'Option 2', disabled: true },
        { value: 3, label: 'Option 3' },
      ]}
    />
  );
};

export const SelectInPopover = () => {
  return (
    <PopoverRoot>
      <PopoverTrigger>
        <Button>Trigger</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Confirmation!</PopoverHeader>
          <PopoverBody>
            <Select options={selectOptions} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </PopoverRoot>
  );
};

export const SelectInModal = () => {
  const modal = useDisclosure();
  return (
    <>
      <Button onClick={modal.onOpen}>Open Modal</Button>

      <DialogRoot isOpen={modal.open} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <DialogHeader>Modal Title</DialogHeader>
          <ModalCloseButton />
          <DialogDescription>
            <Select options={selectOptions} />
          </DialogDescription>

          <DialogFooter>
            <Button visual="@primary" onClick={modal.onClose}>
              Close
            </Button>
          </DialogFooter>
        </ModalContent>
      </DialogRoot>
    </>
  );
};
