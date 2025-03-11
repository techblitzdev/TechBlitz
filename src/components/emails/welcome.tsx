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

interface WelcomeEmailProps {
  userName?: string;
  couponCodeText?: string;
  userEmail?: string;
}

export default function WelcomeEmail({
  userName = 'there',
  couponCodeText = 'WELCOME60',
  userEmail = 'user@example.com',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to TechBlitz - Your journey to tech mastery begins!</Preview>
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
            <Heading style={h1}>Welcome to TechBlitz!</Heading>
            <Text style={heroText}>
              We're thrilled to have you join our community of tech enthusiasts.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Personal Welcome */}
          <Section style={section}>
            <Text style={text}>Hey {userName},</Text>
            <Text style={text}>
              I'm Logan, the founder of TechBlitz, and I wanted to personally thank you for becoming
              part of our growing community. Your decision to join us means a lot!
            </Text>
            <Text style={text}>
              At TechBlitz, we're building a vibrant community of tech enthusiasts who are dedicated
              to continuous learning and growth. Whether you're preparing for technical interviews,
              expanding your programming knowledge, or simply love solving challenging problems -
              you're in the right place.
            </Text>
          </Section>

          {/* Feature Showcase */}
          <Section style={featureSection}>
            <Heading as="h2" style={h2}>
              Discover What TechBlitz Offers
            </Heading>

            <table style={featureRow}>
              <tr>
                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//08-02-25-roadmap-redesign.png`}
                    width="200"
                    height="auto"
                    alt="Study Paths"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Personalized Study Paths
                  </Heading>
                  <Text style={featureText}>
                    Customize your learning journey with our adaptive study paths tailored to your
                    goals and skill level.
                  </Text>
                </td>

                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-04%20at%2022.28.57.png`}
                    width="200"
                    height="auto"
                    alt="Coding Challenges"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Interactive Challenges
                  </Heading>
                  <Text style={featureText}>
                    Practice with our extensive library of coding challenges designed to sharpen
                    your problem-solving skills.
                  </Text>
                </td>
              </tr>
            </table>

            <table style={featureRow}>
              <tr>
                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//leaderboard-hero-redesign.png`}
                    width="200"
                    height="auto"
                    alt="Community"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Supportive Community
                  </Heading>
                  <Text style={featureText}>
                    Connect with like-minded tech enthusiasts, share knowledge, and grow together.
                  </Text>
                </td>

                <td style={featureColumn}>
                  <Img
                    src={`https://lbycuccwrcmdaxjqyxut.supabase.co/storage/v1/object/public/marketing-images//Screenshot%202025-03-04%20at%2022.31.23.png`}
                    width="200"
                    height="auto"
                    alt="Analytics"
                    style={featureIcon}
                  />
                  <Heading as="h3" style={h3}>
                    Progress Analytics
                  </Heading>
                  <Text style={featureText}>
                    Track your learning journey with detailed analytics and insights to optimize
                    your growth.
                  </Text>
                </td>
              </tr>
            </table>
          </Section>

          {/* Special Offer */}
          <Section style={offerSection}>
            <Heading as="h2" style={h2}>
              Special Offer Just for You
            </Heading>
            <Text style={text}>
              As a special thank you for joining us, we're offering you a 60% discount on your first
              three months of a premium subscription.
            </Text>
            <Section style={couponContainer}>
              <Text style={couponCode}>{couponCodeText}</Text>
              <Text style={couponText}>Use this code at checkout</Text>
            </Section>
            <Button href="https://techblitz.dev/upgrade" style={button}>
              Upgrade Now
            </Button>
          </Section>

          {/* Getting Started */}
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Ready to Get Started?
            </Heading>
            <Text style={text}>Here are a few things you can do right away:</Text>
            <ul style={list}>
              <li style={listItem}>
                <Link href="https://techblitz.dev/profile" style={link}>
                  Complete your profile
                </Link>{' '}
                to personalize your experience
              </li>
              <li style={listItem}>
                <Link href="https://techblitz.dev/paths" style={link}>
                  Explore study paths
                </Link>{' '}
                that match your interests
              </li>
              <li style={listItem}>
                <Link href="https://techblitz.dev/challenges" style={link}>
                  Try a coding challenge
                </Link>{' '}
                to test your skills
              </li>
            </ul>
          </Section>

          {/* Follow Development */}
          <Section style={section}>
            <Text style={text}>
              If you want to follow along with the development of TechBlitz, you can do so{' '}
              <Link href="https://git.new/blitz" style={link}>
                here
              </Link>
              . Your support truly means the world to us.
            </Text>
            <Text style={text}>
              If you have questions or feedback, please don't hesitate to reach out to me by{' '}
              <Link
                href={`mailto:team@techblitz.dev?subject=Question from ${userEmail}`}
                style={link}
              >
                email
              </Link>
              .
            </Text>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>Let's revolutionize the tech world together!</Text>
            <Text style={footerText}>Best regards,</Text>
            <Text style={footerSignature}>Logan</Text>
            <Text style={footerFounder}>Founder, TechBlitz</Text>

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
              You're receiving this email because you signed up for TechBlitz.
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

const featureSection = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  margin: '0 30px 40px',
  textAlign: 'center' as const,
  padding: '40px 20px',
};

const featureRow = {
  display: 'table',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto 30px',
};

const featureColumn = {
  display: 'table-cell',
  width: '50%',
  padding: '0 15px',
  verticalAlign: 'top',
};

const featureIcon = {
  marginBottom: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '200px',
  height: 'auto',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
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
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 10px',
};

const text = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const featureText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
};

const offerSection = {
  padding: '40px 30px',
  textAlign: 'center' as const,
  backgroundColor: '#eff6ff',
  margin: '0 20px 40px',
  borderRadius: '8px',
};

const couponContainer = {
  margin: '30px auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  border: '2px dashed #4f46e5',
  maxWidth: '260px',
};

const couponCode = {
  color: '#4f46e5',
  fontSize: '26px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: '0',
};

const couponText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '8px 0 0',
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
  padding: '14px 32px',
  margin: '20px 0 0',
  boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)',
  maxWidth: '100%',
};

const list = {
  padding: '0 0 0 20px',
  margin: '20px 0',
};

const listItem = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '12px 0',
};

const link = {
  color: '#4f46e5',
  textDecoration: 'none',
  fontWeight: '500',
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

const footerSignature = {
  color: '#374151',
  fontSize: '22px',
  fontWeight: '600',
  margin: '20px 0 5px',
  fontFamily: 'cursive',
};

const footerFounder = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 25px',
};

const socialLinks = {
  margin: '25px 0',
};

const socialLink = {
  display: 'inline-block',
  margin: '0 12px',
  padding: '8px',
  borderRadius: '6px',
  backgroundColor: '#f3f4f6',
};

const footerFine = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '8px 0',
};
