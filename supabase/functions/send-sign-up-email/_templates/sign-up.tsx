import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from 'npm:@react-email/components';
import * as React from 'npm:react@18.3.1';

interface TechBlitzSignUpEmailProps {
  username: string;
  confirmationLink: string;
}

export const TechBlitzSignUpEmail = ({
  username,
  confirmationLink
}: TechBlitzSignUpEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to TechBlitz - Confirm Your Email</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://example.com/techblitz-logo.png"
              width="120"
              height="50"
              alt="TechBlitz"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Welcome to TechBlitz!</Heading>
          <Text style={text}>
            We're so glad to have you on board, and ready to help you in you
            software journey! To get started, please confirm your email address.
          </Text>
          <Section style={buttonContainer}>
            <Link
              href={confirmationLink}
              target="_blank"
              style={button}
            >
              Confirm Your Email
            </Link>
          </Section>
          <Text style={text}>
            If you didn't create an account with TechBlitz, you can safely
            ignore this email.
          </Text>
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 TechBlitz. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

TechBlitzSignUpEmail.PreviewProps = {
  username: 'Alice',
  confirmationLink: 'https://techblitz.com/confirm?token=123456'
} as TechBlitzSignUpEmailProps;

export default TechBlitzSignUpEmail;

const accent = '#5b61d6';

const main = {
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontFamily: "'Onest', Verdana, sans-serif"
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px'
};

const logoContainer = {
  marginTop: '32px'
};

const logo = {
  margin: '0 auto'
};

const h1 = {
  color: '#FFFFFF',
  fontSize: '32px',
  fontWeight: '500',
  lineHeight: '24px',
  margin: '40px 0',
  textAlign: 'center' as const
};

const text = {
  color: '#FFFFFF',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  fontFamily: "'Onest', Verdana, sans-serif"
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0'
};

const button = {
  backgroundColor: accent,
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '500',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '10px 28px',
  fontFamily: "'Onest', Verdana, sans-serif"
};

const footer = {
  marginTop: '32px',
  textAlign: 'center' as const
};

const footerText = {
  color: '#CCCCCC',
  fontSize: '12px',
  lineHeight: '16px',
  fontFamily: "'Onest', Verdana, sans-serif"
};

const footerLink = {
  color: '#CCCCCC',
  fontSize: '12px',
  lineHeight: '16px',
  textDecoration: 'underline'
};
