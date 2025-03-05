import React from 'react';
import { Html, Head, Body, Container, Section, Text, Link, Hr, Img } from '@react-email/components';

interface EmailTemplateProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

export const SuggestedChallengeEmailTemplate: React.FC<EmailTemplateProps> = ({
  title,
  description,
  tags,
  link,
}) => {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.section}>
            <Img
              src="https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//logo.png"
              width="100"
              height="100"
              alt="TechBlitz Logo"
              style={styles.logo}
            />
            <Text style={styles.title}>{title}</Text>
            <Link href={link} style={styles.button}>
              Take the Challenge
            </Link>
            <Hr style={styles.hr} />
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.tagLabel}>Your suggested challenge involves:</Text>
            {tags?.length > 0 && (
              <Section style={styles.tagContainer}>
                {tags?.map((tag, index) => (
                  <Text key={index} style={{ ...styles.tag, margin: '4px 4px' }}>
                    {tag}
                  </Text>
                ))}
              </Section>
            )}
            <Hr style={styles.hr} />
            <Text style={styles.footer}>
              Stay consistent, keep coding, and watch your skills grow!
            </Text>
            <Section style={styles.footer}>
              <Text style={styles.footerText}>© 2025 Dev TechBlitz. All rights reserved.</Text>
              <Text style={styles.footerText}>
                Want to stop receiving these emails?{' '}
                <Link
                  href={`${process.env.NEXT_PUBLIC_URL}/settings/profile`}
                  style={styles.listItem}
                >
                  Manage your email preferences
                </Link>
              </Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// default content
// @ts-ignore
SuggestedChallengeEmailTemplate.PreviewProps = {
  title: 'Your daily challenge is ready!',
  description: "Sharpen your coding skills with today's exciting challenge. Are you up for it?",
  tags: ['JavaScript', 'Algorithms', 'Problem Solving', 'React'],
  link: 'https://example.com/daily-challenge',
  difficulty: 'Medium',
} as EmailTemplateProps;

const styles = {
  body: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontFamily:
      "'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  container: {
    margin: '0 auto',
    padding: '20px 0 48px',
  },
  section: {
    backgroundColor: '#000000',
    borderRadius: '8px',
    padding: '48px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    margin: '0 auto 24px',
    display: 'block',
  },
  preheader: {
    color: '#888888',
    fontSize: '14px',
    fontStyle: 'italic',
    textAlign: 'center' as const,
    margin: '0 0 24px',
  },
  difficulty: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 20px',
    lineHeight: '1.5',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 24px',
    lineHeight: '1.3',
    color: '#FFFFFF',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    margin: '0 0 24px',
    textAlign: 'center' as const,
  },
  hr: {
    borderColor: '#333333',
    margin: '24px 0',
  },
  tagLabel: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 16px',
    textAlign: 'center' as const,
    color: '#FFFFFF',
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    gap: '4px',
    margin: '0 0 24px',
    alignItems: 'center',
    textAlign: 'center' as const,
  },
  tag: {
    backgroundColor: '#111111',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '6px 12px',
    borderRadius: '8px',
    display: 'inline-block',
    border: '1px solid #2d2d2d',
  },
  button: {
    backgroundColor: '#5A5FCD',
    borderRadius: '8px',
    color: '#ffffff',
    display: 'block',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '16px 24px',
    textAlign: 'center' as const,
    textDecoration: 'none',
    marginTop: '32px',
    transition: 'background-color 0.3s ease',
  },
  footer: {
    fontSize: '16px',
    color: '#888888',
    textAlign: 'center' as const,
    marginTop: '32px',
    fontStyle: 'italic',
  },
  footerText: {
    fontSize: '12px',
    color: '#888888',
    textAlign: 'center' as const,
  },
  listItem: {
    color: '#888888',
    textAlign: 'center' as const,
  },
};

export default SuggestedChallengeEmailTemplate;
