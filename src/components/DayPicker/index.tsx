import React, { FC, useRef, useState } from 'react';

import { BoxProps, Input, InputProps } from '@chakra-ui/react';
import { DayPickerProps as ReactDayPickerProps } from 'react-day-picker';
import { FiCalendar } from 'react-icons/fi';
import { PopperProps } from 'react-popper';

import { DayPickerContent } from '@/components/DayPicker/_partials';
import { DATE_FORMAT } from '@/components/DayPicker/constants';
import { useDayPickerInputManagement } from '@/components/DayPicker/hooks/useDayPickerInputManagement';
import { useDayPickerMonthNavigation } from '@/components/DayPicker/hooks/useDayPickerMonthNavigation';
import { useDayPickerPopperManagement } from '@/components/DayPicker/hooks/useDayPickerPopperManagement';
import { Icon } from '@/components/Icons';
import { InputGroup } from '@/components/ui/input-group';

export type DayPickerNavigationMode = 'DAY' | 'MONTH';

export type DayPickerInputProps = Omit<
  InputProps,
  'value' | 'onChange' | 'placeholder'
>;

export type DayPickerProps = {
  id?: string;
  value?: Date | null;
  onChange(date: Date | null): void;
  // @ts-ignore
  popperPlacement?: PopperProps['placement'];
  dateFormat?: string;
  placeholder?: string;
  inputProps?: DayPickerInputProps;
  dayPickerProps?: ReactDayPickerProps;
  required?: boolean;
  arePastDaysDisabled?: boolean;
  hasTodayButton?: boolean;
  disabled?: boolean;
  usePortal?: boolean;
  autoFocus?: boolean;
  onClose?(day?: Date | null): void;
  onMonthChange?(date?: Date | null): void;
} & Omit<BoxProps, 'onChange'>;

export const DayPicker: FC<DayPickerProps> = ({
  id,
  value,
  onChange,
  onClose = () => {},
  popperPlacement = 'bottom-start',
  dateFormat = DATE_FORMAT,
  placeholder = 'JJ/MM/AAAA',
  inputProps = {},
  disabled = false,
  autoFocus = false,
  onMonthChange = () => {},
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const size = inputProps?.size;

  // DayPicker focus management
  const [isCalendarFocused, setIsCalendarFocused] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Popper management
  const onClosePopper = () => {
    onClose(value);
    setMode('DAY');
  };

  const popperManagement = useDayPickerPopperManagement({
    containerRef,
    popperPlacement,
    autoFocus,
    setIsCalendarFocused,
    onClosePopper,
    inputRef,
  });
  const { setPopperElement, openPopper, closePopper } = popperManagement;

  const onChangeInput = (newDate: Date | null, updateMonth = false) => {
    onChange(newDate);
    if (updateMonth) {
      selectMonth(newDate);
    }
  };

  const { inputValue, setInputValue, handleInputChange, handleInputBlur } =
    useDayPickerInputManagement({
      dateValue: value,
      dateFormat,
      onChange: onChangeInput,
    });

  const handleDaySelect = (date?: Date | null) => {
    setMonth(date);
    onChange(date ?? null);
    if (date) {
      closePopper();
    } else {
      setInputValue('');
    }
  };

  // Month change management
  const hookMonthNavigation = useDayPickerMonthNavigation(value);
  const { setMode, setMonth, selectMonth } = hookMonthNavigation;

  const handleChangeMonth = (date?: Date | null) => {
    onMonthChange(date);
    setMonth(date);
  };

  // Change to day view once we have selected a month on the month picker
  const handleSelectMonth = (date: Date) => {
    onMonthChange(date);
    selectMonth(date);
  };

  const valueRef = useRef(value);
  valueRef.current = value;

  return (
    <InputGroup
      ref={containerRef}
      width={inputProps.width}
      startElement={
        <Icon
          icon={FiCalendar}
          fontSize={size}
          transform="scale(1.2)"
          color={disabled ? 'gray.300' : 'gray.400'}
          _dark={{
            color: disabled ? 'gray.500' : 'gray.300',
          }}
        />
      }
    >
      <>
        <Input
          ref={inputRef}
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onBlur={(e) => handleInputBlur(e.target.value)}
          onFocus={() => openPopper()}
          disabled={disabled}
          autoFocus={autoFocus}
          {...inputProps} // We want the style to be applied on the input (like the background)
        />
        <DayPickerContent
          value={value}
          isCalendarFocused={isCalendarFocused}
          setIsCalendarFocused={setIsCalendarFocused}
          buttonRef={buttonRef}
          hookMonthNavigation={hookMonthNavigation}
          handleSelectMonth={handleSelectMonth}
          handleChangeMonth={handleChangeMonth}
          handleOnTapEnter={() => handleInputBlur(inputValue)}
          handleDaySelect={handleDaySelect}
          popperManagement={popperManagement}
          ref={setPopperElement}
          {...rest}
        />
      </>
    </InputGroup>
  );
};
