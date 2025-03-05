import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface StudyReminderEmailProps {
  headingText: string;
  studyPathTitle: string;
  goalDate: string;
  progressPercentage: string;
  daysRemaining: number;
  link: string;
}

export default function StudyReminderEmail({
  headingText = 'Keep the momentum going, Alex!',
  studyPathTitle = 'JavaScript Fundamentals',
  goalDate = 'June 15, 2025',
  progressPercentage = '42',
  daysRemaining = 14,
  link = 'https://example.com/continue-learning',
}: StudyReminderEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Continue your journey with {studyPathTitle} - You're making great progress!</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with logo */}
          <Section style={headerSection}>
            <Img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//logo.png"
              width="120"
              height="120"
              alt="Logo"
              style={logo}
            />
          </Section>

          {/* Hero section */}
          <Section style={heroSection}>
            <Heading style={heading}>{headingText}</Heading>
            <Text style={subheading}>
              You're on track to master <strong>{studyPathTitle}</strong>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Progress section */}
          <Section style={progressSection}>
            <Text style={progressTitle}>Your learning journey</Text>
            <div style={progressBarContainer}>
              <div
                style={{
                  ...progressBar,
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
            <Text style={progressText}>
              <strong>{progressPercentage}% complete</strong> - You're making excellent progress!
            </Text>
          </Section>

          {/* Goal reminder */}
          <Section style={goalSection}>
            <Text style={goalText}>
              <span style={highlight}>Remember your goal:</span> Complete this path by{' '}
              <strong>{goalDate}</strong>
            </Text>
            <Text style={timeRemaining}>
              Only <strong>{daysRemaining} days remaining</strong> to reach your target!
            </Text>
          </Section>

          {/* CTA section */}
          <Section style={ctaSection}>
            <Button style={{ ...button, padding: '12px 20px' }} href={link}>
              Continue Learning Now
            </Button>
            <Text style={ctaSubtext}>Pick up right where you left off</Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>© 2025 DEV TECHBLITZ LTD. All rights reserved.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '24px',
  borderRadius: '12px',
  maxWidth: '600px',
};

const headerSection = {
  padding: '20px 0',
};

const logo = {
  margin: '0 auto',
};

const heroSection = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333',
  margin: '16px 0',
};

const subheading = {
  fontSize: '18px',
  color: '#666',
  margin: '0 0 24px',
  lineHeight: '26px',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const progressSection = {
  padding: '10px 0',
};

const progressTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  margin: '0 0 12px',
};

const progressBarContainer = {
  height: '12px',
  backgroundColor: '#f0f0f0',
  borderRadius: '6px',
  overflow: 'hidden',
};

const progressBar = {
  height: '100%',
  backgroundColor: '#5b61d6',
  borderRadius: '6px',
};

const progressText = {
  fontSize: '16px',
  color: '#666',
  margin: '12px 0 0',
};

const goalSection = {
  backgroundColor: '#f8fafc',
  padding: '16px',
  borderRadius: '8px',
  margin: '20px 0',
};

const goalText = {
  fontSize: '16px',
  color: '#4b5563',
  margin: '0 0 8px',
};

const timeRemaining = {
  fontSize: '16px',
  color: '#4b5563',
  margin: '0',
};

const highlight = {
  color: '#5b61d6',
  fontWeight: 'bold',
};

const ctaSection = {
  padding: '24px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#5b61d6',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
};

const ctaSubtext = {
  fontSize: '14px',
  color: '#6b7280',
  margin: '12px 0 0',
};

const footer = {
  textAlign: 'center' as const,
  padding: '0 0 20px',
};

const footerText = {
  fontSize: '14px',
  color: '#9ca3af',
  margin: '0 0 8px',
};
