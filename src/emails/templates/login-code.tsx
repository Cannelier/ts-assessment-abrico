import {
  Button,
  Container,
  Heading,
  Section,
  Text,
} from '@react-email/components';
import { UUID } from 'crypto';

import { Footer } from '@/emails/components/Footer';
import { Layout } from '@/emails/components/Layout';
import { styles } from '@/emails/styles';
import { env } from '@/env.mjs';
import { VALIDATION_TOKEN_EXPIRATION_IN_MINUTES } from '@/features/auth/utils';
import i18n from '@/lib/i18n/server';

type EmailLoginCodeProps = {
  language: string;
  name: string;
  code: string;
  token: UUID;
  email: string;
};

export const EmailLoginCode = ({
  language,
  name,
  code,
  token,
  email,
}: EmailLoginCodeProps) => {
  i18n.changeLanguage(language);
  return (
    <Layout
      preview={i18n.t('emails:loginCode.preview', { code })}
      language={language}
    >
      <Container style={styles.container}>
        <Heading style={styles.h1}>{i18n.t('emails:loginCode.title')}</Heading>
        <Section style={styles.section}>
          <Text style={styles.text}>
            {i18n.t('emails:loginCode.hello', { name: name ?? '' })}
            <br />
            {i18n.t('emails:loginCode.intro')}
          </Text>
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.textMuted}>
            {i18n.t('emails:loginCode.validityTime', {
              expiration: VALIDATION_TOKEN_EXPIRATION_IN_MINUTES,
            })}
            <br />
            {i18n.t('emails:loginCode.ignoreHelper')}
          </Text>

          <Button
            href={
              env.NEXT_PUBLIC_BASE_URL +
              `/login/${token}?email=${email}&code=${code}`
            }
          >
            {i18n.t('emails:loginCode.openApp')}
          </Button>
        </Section>
        <Footer />
      </Container>
    </Layout>
  );
};

export default EmailLoginCode;
