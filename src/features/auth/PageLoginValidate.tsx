import { useEffect, useState } from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LuArrowLeft } from 'react-icons/lu';

import { ROUTES_APP } from '@/features/app/routes';
import {
  VerificationCodeForm,
  useOnVerificationCodeError,
} from '@/features/auth/VerificationCodeForm';
import {
  FormFieldsVerificationCode,
  zFormFieldsVerificationCode,
} from '@/features/auth/schemas';
import { trpc } from '@/lib/trpc/client';

export default function PageLoginValidate() {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const trpcUtils = trpc.useUtils();
  const queryCache = useQueryClient();

  const token = params?.token?.toString() ?? '';
  const email = searchParams.get('email');

  const form = useForm<FormFieldsVerificationCode>({
    mode: 'onBlur',
    resolver: zodResolver(zFormFieldsVerificationCode()),
    defaultValues: {
      code: [],
    },
  });

  const onVerificationCodeError = useOnVerificationCodeError({
    onError: (error) =>
      form.setError('code', {
        message: error,
      }),
  });

  const validate = trpc.auth.loginValidate.useMutation({
    onSuccess: (data) => {
      queryCache.clear();

      // Optimistic Update
      trpcUtils.auth.checkAuthenticated.setData(undefined, {
        isAuthenticated: true,
      });

      if (redirect) {
        router.replace(redirect);
        return;
      }

      router.replace(ROUTES_APP.root());
    },
    onError: onVerificationCodeError,
  });

  const onSubmit = form.handleSubmit((data) =>
    validate.mutate({ ...data, token })
  );

  const code = searchParams.get('code');
  const [hasBeenAutoLogged, setHasBeenAutoLogged] = useState(false);
  useEffect(() => {
    if (code && !hasBeenAutoLogged) {
      setHasBeenAutoLogged(true);
      validate.mutate({ code: code.split(''), token });
    }
  }, [code, hasBeenAutoLogged, token, validate]);

  return (
    <Stack gap={6}>
      <Button me="auto" size="sm" onClick={() => router.back()}>
        <LuArrowLeft />
        {t('common:actions.back')}
      </Button>

      <form onSubmit={onSubmit}>
        <FormProvider {...form}>
          <VerificationCodeForm
            email={email ?? ''}
            isLoading={validate.isPending || validate.isSuccess}
          />
        </FormProvider>
      </form>
    </Stack>
  );
}
