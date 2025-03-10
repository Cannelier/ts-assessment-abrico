import { Link, Section } from '@react-email/components';

import { styles } from '@/emails/styles';

export const Footer = () => {
  return (
    <Section style={styles.footer}>
      <Link style={styles.link} href="https://abrico.com" target="_blank">
        Abrico
      </Link>
    </Section>
  );
};
