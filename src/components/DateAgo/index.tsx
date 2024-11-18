import React, { FC, forwardRef, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { Tooltip, TooltipProps } from '@/components/ui/tooltip';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

const getDelay = (diff: number) => {
  if (diff <= ONE_MINUTE) return ONE_SECOND * 10;
  if (diff <= ONE_HOUR) return ONE_MINUTE;
  if (diff <= ONE_DAY) return ONE_MINUTE * 15;
  return ONE_HOUR;
};

export type DateAgoProps = Omit<TooltipProps, 'children' | 'content'> & {
  date?: string | Date | dayjs.Dayjs;
  format?: string;
};

export const DateAgo: FC<React.PropsWithChildren<DateAgoProps>> = forwardRef(
  function DateAgo({ date = new Date(), format, ...rest }, ref) {
    const { t } = useTranslation(['components']);
    const [, setForceUpdate] = useState(0);
    const dayjsDate = dayjs(date);
    const dateFormatted = dayjsDate.format();

    useEffect(() => {
      if (dateFormatted) {
        const diff = dayjs().diff(dayjs(dateFormatted));

        const timeout = setTimeout(() => {
          setForceUpdate((x) => x + 1);
        }, getDelay(diff));
        return () => clearTimeout(timeout);
      }
    }, [dateFormatted]);

    if (!date) {
      return null;
    }

    return (
      <Tooltip
        // @ts-expect-error
        ref={ref}
        label={dayjsDate.format(format ?? t('components:dateAgo.format'))}
        placement="top-start"
        {...rest}
      >
        {dayjsDate.fromNow()}
      </Tooltip>
    );
  }
);
