import React from 'react';

import { Box, BoxProps, Flex, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { toastCustom } from '@/components/Toast';
import { Button, ButtonProps } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { FormFieldsLogin, zFormFieldsLogin } from '@/features/auth/schemas';
import { LoginHint } from '@/features/devtools/LoginHint';
import { trpc } from '@/lib/trpc/client';
import type { RouterInputs, RouterOutputs } from '@/lib/trpc/types';

type LoginFormProps = BoxProps & {
  onSuccess?: (
    data: RouterOutputs['auth']['login'],
    variables: RouterInputs['auth']['login']
  ) => void;
};

export const LoginForm = ({
  onSuccess = () => undefined,
  ...rest
}: LoginFormProps) => {
  const { t } = useTranslation(['auth']);

  const login = trpc.auth.login.useMutation({
    onSuccess,
    onError: () => {
      toastCustom({
        status: 'error',
        title: t('auth:login.feedbacks.loginError.title'),
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFieldsLogin>({
    mode: 'onBlur',
    resolver: zodResolver(zFormFieldsLogin()),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit((data) => login.mutate(data));

  return (
    <Box {...rest}>
      <form onSubmit={onSubmit}>
        <Stack gap={4}>
          <Field invalid={!!errors.email}>
            <Input
              {...register('email')}
              type="email"
              size="lg"
              placeholder={t('auth:data.email.label')}
            />
          </Field>
          <Flex>
            <Button
              loading={login.isPending || login.isSuccess}
              type="submit"
              size="lg"
              flex={1}
            >
              {t('auth:login.actions.login')}
            </Button>
          </Flex>

          <LoginHint />
        </Stack>
      </form>
    </Box>
  );
};
