import { ReactNode, useRef } from 'react';

import { HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { TRPCClientErrorLike } from '@trpc/client';
import { useSearchParams } from 'next/navigation';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Controller, useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { PinInput } from '@/components/ui/pin-input';
import { FormFieldsVerificationCode } from '@/features/auth/schemas';
import {
  VALIDATION_TOKEN_EXPIRATION_IN_MINUTES,
  getValidationRetryDelayInSeconds,
} from '@/features/auth/utils';
import { ValidationCodeHint } from '@/features/devtools/ValidationCodeHint';
import { AppRouter } from '@/lib/trpc/types';

export type VerificationCodeFormProps = {
  email: string;
  isLoading?: boolean;
  confirmText?: ReactNode;
  autoSubmit?: boolean;
};

export const VerificationCodeForm = ({
  email,
  isLoading,
  confirmText,
  autoSubmit = true,
}: VerificationCodeFormProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['auth']);
  const searchParams = useSearchParams();

  const codeFromURL = searchParams.get('code');

  const form = useFormContext<FormFieldsVerificationCode>();

  return (
    <Stack gap="4" ref={ref}>
      <Stack>
        <Heading size="md">{t('auth:validate.title')}</Heading>
        <Text fontSize="sm">
          <Trans
            t={t}
            i18nKey="auth:validate.description"
            values={{
              email,
              expiration: VALIDATION_TOKEN_EXPIRATION_IN_MINUTES,
            }}
            components={{
              b: <strong />,
            }}
          />
        </Text>
      </Stack>

      <Field
        label={t('auth:data.verificationCode.label')}
        helperText={t('auth:data.verificationCode.helper')}
        invalid={!!form.formState.errors.code}
        errorText={form.formState.errors.code?.message}
      >
        <Controller
          control={form.control}
          name="code"
          render={({ field }) => (
            <PinInput
              count={6}
              defaultValue={codeFromURL?.split('')}
              autoFocus
              onValueComplete={(e) => {
                field.onChange(e.value);
                // Only auto submit on first try
                if (!form.formState.isSubmitted && autoSubmit) {
                  const button = document.createElement('button');
                  button.type = 'submit';
                  button.style.display = 'none';
                  ref.current?.append(button);
                  button.click();
                  button.remove();
                }
              }}
            />
          )}
        />
      </Field>

      <HStack gap={8}>
        <Button size="lg" loading={isLoading} type="submit" flex={1}>
          {confirmText || t('auth:validate.actions.confirm')}
        </Button>
      </HStack>

      <ValidationCodeHint />
    </Stack>
  );
};

export const useOnVerificationCodeError = ({
  onError,
}: {
  onError: (error: string) => void;
}) => {
  const { t } = useTranslation(['auth']);
  const [attempts, setAttemps] = useQueryState(
    'attemps',
    parseAsInteger.withDefault(0)
  );

  return async (error: TRPCClientErrorLike<AppRouter>) => {
    if (error.data?.code === 'UNAUTHORIZED') {
      const seconds = getValidationRetryDelayInSeconds(attempts);

      setAttemps((s) => s + 1);

      await new Promise((r) => {
        setTimeout(r, seconds * 1_000);
      });

      onError(t('auth:data.verificationCode.unknown'));

      return;
    }

    if (error.data?.code === 'BAD_REQUEST') {
      onError(t('auth:data.verificationCode.invalid'));
      return;
    }

    onError(t('auth:data.verificationCode.unknown'));
  };
};
