import { Stack } from '@chakra-ui/react';

import { Alert } from '@/components/ui/alert';

export default {
  title: 'StyleGuide/Alerts',
};

export const Default = () => (
  <Stack>
    <Alert>
      <>Description</>
    </Alert>
    <Alert title={'Title'}></Alert>
    <Alert title={'title'}>
      <>Description</>
    </Alert>
    <Alert title="title">
      <>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae odio
        distinctio eos sequi, voluptates sit voluptas fuga perspiciatis nostrum
        excepturi cum expedita itaque in assumenda, sed voluptatum non
        accusantium enim.
      </>
    </Alert>
    <Alert title={'title'}>
      <>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae odio
        distinctio eos sequi, voluptates sit voluptas fuga perspiciatis nostrum
        excepturi cum expedita itaque in assumenda, sed voluptatum non
        accusantium enim.
      </>
    </Alert>
  </Stack>
);

export const Success = () => (
  <Alert status="success" title={'Success!'}>
    <>Data uploaded to the server. Fire on!</>
  </Alert>
);

export const Warning = () => (
  <Alert status="warning" title={'warning'}>
    <>Seems your account is about expire, upgrade now.</>
  </Alert>
);

export const Error = () => (
  <Alert status="error" title={'Your browser is outdated!'}>
    <>Your Chakra experience may be degraded.</>
  </Alert>
);

export const Info = () => (
  <Alert status="info" title={'info'}>
    <>Chakra is going live on August 30th. Get ready!</>
  </Alert>
);
