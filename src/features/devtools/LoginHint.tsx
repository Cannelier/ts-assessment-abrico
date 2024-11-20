import { Link as ChakraLink } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { Alert } from '@/components/ui/alert';
import { env } from '@/env.mjs';

export const LoginHint = () => {
  const form = useFormContext();
  const mockedEmail = 'admin@admin.com';

  if (env.NEXT_PUBLIC_NODE_ENV !== 'development' && !env.NEXT_PUBLIC_IS_DEMO)
    return null;

  return (
    <Alert
      status="info"
      title={env.NEXT_PUBLIC_IS_DEMO ? 'Demo mode' : env.NEXT_PUBLIC_NODE_ENV}
    >
      Enjoy the features! You can sign in with{' '}
      <ChakraLink
        as="button"
        type="button"
        fontWeight="bold"
        onClick={() => form.setValue('email', mockedEmail)}
      >
        {mockedEmail}
      </ChakraLink>
    </Alert>
  );
};
