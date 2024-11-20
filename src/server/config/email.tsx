import { ReactElement } from 'react';

import { render } from '@react-email/render';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

import { env } from '@/env.mjs';
import { DEFAULT_LANGUAGE_KEY } from '@/lib/i18n/constants';

if (env.SENDGRID_API_KEY) {
  sgMail.setApiKey(env.SENDGRID_API_KEY);
}

export const sendEmail = async ({
  template,
  ...options
}: { subject: string; to: string } & {
  template: ReactElement;
}): Promise<void> => {
  if (env.NEXT_PUBLIC_IS_DEMO) {
    return;
  }

  const html = await render(template);

  if (env.NODE_ENV === 'production') {
    await sgMail.send({
      from: {
        name: 'Abrico',
        email: env.EMAIL_FROM as string,
      },
      to: options.to as string,
      html,
      subject: options.subject,
    });
  } else {
    const transport = nodemailer.createTransport(
      'smtp://username:password@0.0.0.0:1025'
    );

    await transport.sendMail({
      from: env.EMAIL_FROM,
      html,
      ...options,
    });
  }
};

export const previewEmailRoute = async (
  req: Request,
  {
    params,
  }: {
    params: { options: [string, string?] };
  }
) => {
  // Allows debug only in development
  if (env.NODE_ENV !== 'development') {
    return new Response(undefined, {
      status: 404,
    });
  }

  const [template, language = DEFAULT_LANGUAGE_KEY] = params.options;
  const query = req.url.split('?')[1];
  const searchQuery = Object.fromEntries(new URLSearchParams(query ?? ''));

  let Email;
  try {
    const EmailModule = await import(`@/emails/templates/${template}`);
    Email = EmailModule.default;
  } catch {
    return new Response('Template not found', {
      status: 404,
    });
  }

  const html = await render(
    <Email language={language ?? 'en'} {...searchQuery} />
  );

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
    },
  });
};
