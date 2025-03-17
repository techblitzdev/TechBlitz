import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface NoChallengesEmailProps {
  userName?: string;
  userEmail?: string;
  suggestedChallenge?: {
    title: string;
    difficulty: string;
    url: string;
  };
  streakCount?: number;
  daysInactive?: number;
}

export default function NoChallengesEmail({
  userName = 'there',
  userEmail = 'user@example.com',
  suggestedChallenge = {
    title: 'Writing Your First Function',
    difficulty: 'Beginner',
    url: 'https://techblitz.dev/question/writing-your-first-function',
  },
  streakCount = 0,
  daysInactive = 7,
}: NoChallengesEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>We miss you at TechBlitz! Jump back into coding with a quick challenge</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={logoContainer}>
            <Img
              src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//logo.png`}
              width="80"
              height="80"
              alt="Logo"
              style={logo}
            />
          </Section>

          {/* Hero Section */}
          <Section style={heroSection}>
            <Heading style={h1}>We Miss You!</Heading>
            <Text style={heroText}>
              It's been {daysInactive} days since your last coding challenge.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Personal Message */}
          <Section style={section}>
            <Text style={text}>Hey {userName},</Text>
            <Text style={text}>
              We've noticed you haven't completed any coding challenges lately. Consistent practice
              is key to coding mastery, and we'd love to see you back on track!
            </Text>
            <Text style={text}>
              {streakCount > 0 ? (
                <>
                  You were on a <strong>{streakCount}-day streak</strong> before. Let's get that
                  momentum going again!
                </>
              ) : (
                <>
                  Building a coding streak can dramatically improve your skills over time. Even just
                  5 minutes a day makes a huge difference.
                </>
              )}
            </Text>
          </Section>

          {/* Challenge Recommendation */}
          <Section style={challengeSection}>
            <Heading as="h2" style={h2}>
              A Challenge Just For You
            </Heading>
            <div style={challengeCard}>
              <Heading as="h3" style={h3}>
                {suggestedChallenge.title}
              </Heading>
              <Text style={challengeDescription}>
                This challenge takes only 3-5 minutes to complete and will help you get back into
                your coding routine.
              </Text>
              <Button href={suggestedChallenge.url} style={button}>
                Solve This Challenge
              </Button>
            </div>
          </Section>

          {/* CTA Section */}
          <Section style={section}>
            <div style={ctaSection}>
              <Heading as="h2" style={h2}>
                Ready to Jump Back In?
              </Heading>
              <Text style={text}>
                Just 5 minutes of coding practice each day can significantly improve your skills
                over time. Let's rebuild that momentum together!
              </Text>
              <Button href="https://techblitz.dev/dashboard" style={buttonLarge}>
                Resume Your Coding Journey
              </Button>
            </div>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            {/* Social Links */}
            <Section style={socialLinks}>
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
              <Link href="https://git.new/blitz" style={socialLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  />
                </svg>
              </Link>{' '}
            </Section>

            <Text style={footerFine}>© 2025 DEV TECHBLITZ LTD. All rights reserved.</Text>
            <Text style={footerFine}>
              You're receiving this email because you agreed to receive daily reminders from
              TechBlitz. Want to stop receiving these emails? <br />
              <Link href={`https://techblitz.dev/settings/`} style={footerLink}>
                Update your email preferences
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
};

const logoContainer = {
  padding: '30px 30px 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
  display: 'block',
};

const heroSection = {
  backgroundColor: '#4f46e5',
  padding: '50px 30px',
  textAlign: 'center' as const,
  color: '#ffffff',
  marginBottom: '20px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 20px',
  lineHeight: '1.2',
};

const heroText = {
  color: '#ffffff',
  fontSize: '18px',
  margin: '0',
  lineHeight: '1.5',
  maxWidth: '400px',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const section = {
  padding: '40px 30px',
};

const challengeSection = {
  padding: '40px 30px',
  backgroundColor: '#f9fafb',
};

const challengeCard = {
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  padding: '24px',
  textAlign: 'center' as const,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e5e7eb',
};

const challengeDescription = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '0 0 24px',
};

const ctaSection = {
  backgroundColor: '#eff6ff',
  padding: '30px',
  textAlign: 'center' as const,
  borderRadius: '8px',
  width: '89%',
};

const h2 = {
  color: '#374151',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 20px',
  textAlign: 'center' as const,
};

const h3 = {
  color: '#4f46e5',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 12px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const button = {
  backgroundColor: '#4f46e5',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '8px 0',
};

const buttonLarge = {
  backgroundColor: '#4f46e5',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  margin: '24px 0 0',
  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '40px 0',
  borderWidth: '1px',
};

const footer = {
  padding: '0 30px 40px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: '8px 0',
};

const socialLinks = {
  margin: '25px 0',
};

const socialLink = {
  display: 'inline-block',
  margin: '0 12px',
  color: '#6b7280',
};

const footerFine = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '8px 0',
};

const footerLink = {
  color: '#4f46e5',
  textDecoration: 'underline',
};
