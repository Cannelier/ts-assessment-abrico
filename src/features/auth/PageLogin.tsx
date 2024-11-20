import React from 'react';

import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/features/auth/LoginForm';
import { ROUTES_AUTH } from '@/features/auth/routes';
import type { RouterInputs, RouterOutputs } from '@/lib/trpc/types';

export default function PageLogin() {
  const { t } = useTranslation(['auth', 'common']);
  const router = useRouter();

  const handleOnSuccess = (
    data: RouterOutputs['auth']['login'],
    variables: RouterInputs['auth']['login']
  ) => {
    router.push(
      ROUTES_AUTH.loginValidate({
        token: data.token,
        email: variables.email,
      })
    );
  };

  return (
    <Stack gap={6}>
      <LoginForm onSuccess={handleOnSuccess} />
    </Stack>
  );
}
