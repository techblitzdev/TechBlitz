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
  Img,
} from '@react-email/components'
import * as React from 'react'

interface ReferralEmailProps {
  referrerUid: string
  referrerEmail: string
}

const ReferralEmail = ({ referrerUid, referrerEmail }: ReferralEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You've been invited to join TechBlitz! 🚀</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://techblitz.dev/logo.png"
              width="111"
              height="26"
              alt="TechBlitz Logo"
              style={logo}
            />
          </Section>
          <Heading style={h1}>Welcome to TechBlitz!</Heading>
          <Text style={text}>
            You've been invited to join TechBlitz by{' '}
            <strong>{referrerEmail}</strong>.
          </Text>
          <Text style={text}>
            Get ready to supercharge your development workflow and collaborate
            with amazing developers!
          </Text>
          <Section style={buttonContainer}>
            <Link
              href={`https://techblitz.dev/signup?ref=${referrerUid}`}
              style={button}
            >
              Accept Invitation
            </Link>
          </Section>
          <Text style={text}>
            Join our community and take your development skills to the next
            level!
          </Text>
          <Section style={buttonContainer}>
            <Link href="https://git.new/blitz" style={secondaryButton}>
              Star us on GitHub
            </Link>
          </Section>
          <Section style={socialContainer}>
            <Link href="https://x.com/techblitz_dev" style={socialLink}>
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
            <Link href="https://git.new/techblitz" style={socialLink}>
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
            </Link>{' '}
          </Section>
          <Text style={text}>
            If you have any questions or need help getting started, just reply
            to this email. We're here to help!
          </Text>
          <Section style={footer}>
            <Text style={footerText}>
              © 2025 TechBlitz. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default ReferralEmail

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: "'Onest', 'Helvetica', sans-serif",
}

const container = {
  margin: '0 auto',
  padding: '40px 20px 48px',
  width: '100%',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}

const logoContainer = {
  marginBottom: '32px',
  textAlign: 'center' as const,
}

const logo = {
  margin: '0 auto',
}

const h1 = {
  color: '#333333',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '36px',
  margin: '0 0 20px',
  textAlign: 'center' as const,
}

const text = {
  color: '#4f4f4f',
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'center' as const,
  margin: '0 0 20px',
}

const buttonContainer = {
  margin: '32px 0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#5A5FCD',
  borderRadius: '6px',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  padding: '12px 32px',
  display: 'inline-block',
}

const secondaryButton = {
  ...button,
  backgroundColor: '#ffffff',
  color: '#5A5FCD',
  border: '2px solid #5A5FCD',
}

const socialContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  margin: '32px 0',
}

const socialLink = {
  textDecoration: 'none',
}

const footer = {
  marginTop: '32px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e0e0e0',
  paddingTop: '24px',
}

const footerText = {
  color: '#999999',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '4px 0',
}
