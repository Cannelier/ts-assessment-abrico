import React, { FC, forwardRef, useEffect, useRef, useState } from 'react';

import {
  Box,
  IconButton,
  Input,
  InputProps,
  useControllableState,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { LuSearch, LuX } from 'react-icons/lu';

import { InputGroup } from '@/components/ui/input-group';
import { useMergeRefs } from '@/hooks/useMergeRefs';

type CustomProps = {
  value?: string;
  defaultValue?: string;
  onChange?(value?: string): void;
  delay?: number;
  clearLabel?: string;
};

type SearchInputProps = Overwrite<InputProps, CustomProps>;

export const SearchInput: FC<React.PropsWithChildren<SearchInputProps>> =
  forwardRef(
    (
      {
        value,
        defaultValue,
        onChange,
        delay = 500,
        placeholder,
        clearLabel,
        disabled = false,
        ...rest
      },
      ref
    ) => {
      const { t } = useTranslation(['components']);

      const [externalValue, setExternalValue] = useControllableState({
        value,
        defaultValue,
        onChange,
      });
      const inputRef = useRef<HTMLInputElement>();
      const refs = useMergeRefs(inputRef, ref);

      const [search, setSearch] = useState<string>(externalValue);

      const searchRef = useRef(search);
      searchRef.current = search;

      const setExternalValueRef = useRef<typeof setExternalValue>();
      setExternalValueRef.current = setExternalValue;

      useEffect(() => {
        const handler = setTimeout(() => {
          setExternalValueRef.current?.(search);
        }, delay);

        return () => clearTimeout(handler);
      }, [search, delay]);

      useEffect(() => {
        if (externalValue !== searchRef.current) {
          setSearch(externalValue);
        }
      }, [externalValue]);

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
      };

      const handleClear = () => {
        setSearch('');
        inputRef?.current?.focus();
      };

      const handleEscape = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event?.key?.toLowerCase() === 'escape') {
          handleClear();
        }
      };

      return (
        <InputGroup
          {...rest}
          endElement={
            !disabled && search ? (
              <IconButton
                onClick={handleClear}
                visual="@secondary"
                size="xs"
                aria-label={clearLabel ?? t('components:searchInput.clear')}
                pointerEvents="auto"
              >
                <LuX />
              </IconButton>
            ) : (
              <Box pointerEvents="none" opacity={disabled ? 0.3 : undefined}>
                <LuSearch />
              </Box>
            )
          }
        >
          <Input
            ref={refs}
            onChange={handleChange}
            value={search || ''}
            placeholder={placeholder ?? t('components:searchInput.placeholder')}
            disabled={disabled}
            onKeyDown={handleEscape}
          />
        </InputGroup>
      );
    }
  );
SearchInput.displayName = 'SearchInput';
