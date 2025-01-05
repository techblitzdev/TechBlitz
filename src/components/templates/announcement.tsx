import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface WaitlistAnnouncementEmailProps {
  email: string;
}

const WaitlistAnnouncementEmail = ({
  email,
}: WaitlistAnnouncementEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>TechBlitz is now live! 🚀 Plus, a special gift for you</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="111"
              height="26"
              viewBox="0 0 111 26"
              fill="none"
              style={logo}
            >
              <g clipPath="url(#clip0_85_7)">
                <rect width="111" height="26" fill="black" />
                <path
                  d="M6.74696 23.4774C5.38696 23.4774 4.41096 23.1094 3.81896 22.3734C3.24296 21.6214 2.95496 20.5734 2.95496 19.2294V12.8934H0.938963V10.6854H2.95496V7.01337H5.42696V10.6854H9.29096V12.8934H5.42696V18.8214C5.42696 19.2694 5.46696 19.6774 5.54696 20.0454C5.64296 20.4134 5.81896 20.7014 6.07496 20.9094C6.33096 21.1174 6.69896 21.2294 7.17896 21.2454C7.54696 21.2454 7.86696 21.1814 8.13896 21.0534C8.42696 20.9254 8.65896 20.7814 8.83496 20.6214L9.79496 22.4694C9.49096 22.7094 9.17096 22.9094 8.83496 23.0694C8.51496 23.2134 8.17896 23.3174 7.82696 23.3814C7.47496 23.4454 7.11496 23.4774 6.74696 23.4774ZM17.6255 23.4774C16.2975 23.4774 15.1855 23.2054 14.2895 22.6614C13.3935 22.1174 12.7135 21.3654 12.2495 20.4054C11.8015 19.4294 11.5775 18.3094 11.5775 17.0454C11.5775 15.7654 11.8095 14.6374 12.2735 13.6614C12.7535 12.6854 13.4415 11.9174 14.3375 11.3574C15.2495 10.7974 16.3455 10.5174 17.6255 10.5174C18.6015 10.5174 19.4495 10.7014 20.1695 11.0694C20.8895 11.4214 21.4815 11.9014 21.9455 12.5094C22.4255 13.1174 22.7775 13.7974 23.0015 14.5494C23.2255 15.2854 23.3215 16.0534 23.2895 16.8534C23.2895 17.0294 23.2815 17.1974 23.2655 17.3574C23.2495 17.5174 23.2335 17.6854 23.2175 17.8614H14.0735C14.1215 18.5014 14.2815 19.0854 14.5535 19.6134C14.8415 20.1414 15.2415 20.5654 15.7535 20.8854C16.2655 21.1894 16.8975 21.3414 17.6495 21.3414C18.0655 21.3414 18.4655 21.2934 18.8495 21.1974C19.2495 21.0854 19.6015 20.9174 19.9055 20.6934C20.2255 20.4534 20.4495 20.1494 20.5775 19.7814H23.0735C22.8655 20.6294 22.4895 21.3334 21.9455 21.8934C21.4175 22.4374 20.7695 22.8374 20.0015 23.0934C19.2495 23.3494 18.4575 23.4774 17.6255 23.4774ZM14.1215 15.8934H20.8415C20.8255 15.2694 20.6815 14.7174 20.4095 14.2374C20.1375 13.7414 19.7615 13.3574 19.2815 13.0854C18.8015 12.7974 18.2255 12.6534 17.5535 12.6534C16.8175 12.6534 16.2015 12.8054 15.7055 13.1094C15.2255 13.4134 14.8495 13.8134 14.5775 14.3094C14.3215 14.7894 14.1695 15.3174 14.1215 15.8934Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_85_7">
                  <rect width="111" height="26" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Section>
          <Heading style={h1}>We're Live! 🚀</Heading>
          <Text style={text}>
            Hey {email}, the wait is over! TechBlitz is now officially live and
            ready for you to explore.
          </Text>
          <Text style={text}>
            As a thank you for being one of our early supporters, we're giving
            you an exclusive 50% discount on our lifetime premium access.
          </Text>
          <Section style={couponContainer}>
            <Text style={couponCode}>LIFETIME50</Text>
            <Text style={couponText}>50% off lifetime premium access</Text>
          </Section>
          <Section style={buttonContainer}>
            <Link href="https://techblitz.dev/signup" style={button}>
              Sign Up Now!
            </Link>
          </Section>
          <Text style={text}>
            We're proud to announce that TechBlitz is open source! Check out our
            GitHub repository to see how we built it, contribute, or just star
            the project.
          </Text>
          <Section style={buttonContainer}>
            <Link
              href="https://github.com/techblitzdev/TechBlitz/"
              style={button}
            >
              Star us on GitHub!
            </Link>
          </Section>
          <Section style={listContainer}>
            <Link href="https://x.com/techblitz_dev" style={listItem}>
              <svg
                data-testid="geist-icon"
                height="24"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.60022 2H5.80022L8.78759 6.16842L12.4002 2H14.0002L9.5118 7.17895L14.4002 14H10.2002L7.21285 9.83158L3.60022 14H2.00022L6.48864 8.82105L1.60022 2ZM10.8166 12.8L3.93657 3.2H5.18387L12.0639 12.8H10.8166Z"
                  fill="currentColor"
                ></path>
              </svg>
            </Link>
            <Link href="https://git.new/techblitz" style={listItem}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                />
              </svg>
            </Link>
          </Section>
          <Text style={text}>
            If you have any questions or need help getting started, just reply
            to this email. We're here to help!
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

export default WaitlistAnnouncementEmail;

const main = {
  backgroundColor: '#000000',
  color: '#FFFFFF',
  fontFamily: "'Onest', Verdana, sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '40px 20px 48px',
  width: '100%',
  maxWidth: '600px',
  textAlign: 'center' as const,
};

const logoContainer = {
  marginTop: '32px',
  marginBottom: '32px',
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#FFFFFF',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '40px',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const text = {
  color: '#FFFFFF',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  margin: '0 0 20px',
};

const couponContainer = {
  margin: '32px 0',
  padding: '16px',
  border: '2px dashed #5A5FCD',
  borderRadius: '8px',
};

const couponCode = {
  color: '#5A5FCD',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 8px',
};

const couponText = {
  color: '#FFFFFF',
  fontSize: '14px',
  margin: '0',
};

const buttonContainer = {
  margin: '32px 0',
};

const button = {
  backgroundColor: '#5A5FCD',
  borderRadius: '6px',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 32px',
};

const listContainer = {
  margin: '0 0 32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '24px',
};

const listItem = {
  color: '#FFFFFF',
  fontSize: '16px',
  lineHeight: '24px',
  display: 'inline-flex',
  alignItems: 'center',
  marginBottom: '8px',
};

const footer = {
  marginTop: '32px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#CCCCCC',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '4px 0',
};
