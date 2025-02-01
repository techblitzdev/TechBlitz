import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "npm:@react-email/components";
import * as React from "npm:react";

interface EmailUpdateProps {
  username: string;
  redirect_to: string;
}

export const EmailChangeEmail = ({
  username,
  redirect_to,
}: EmailUpdateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your TechBlitz email has been updated</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={h1}>Email Address Updated</Text>
          <Text style={text}>Hello {username},</Text>
          <Text style={text}>
            You have requested to update your email address, please click the
            button below to confirm the change. If you did not make this
            request, please contact our support team immediately.
          </Text>

          <Section style={buttonContainer}>
            <Link href={redirect_to} target="_blank" style={button}>
              Update Your Email Address
            </Link>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              © 2025 TechBlitz. All rights reserved.
            </Text>
            <Text style={footerText}>
              If you have any questions, please contact our support team at{" "}
              <Link href={`mailto:team@techblitz.dev`} style={footerLink}>
                team@techblitz.dev
              </Link>
              or reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

EmailChangeEmail.PreviewProps = {
  username: "John Doe",
  newEmail: "john.doe@example.com",
  supportEmail: "team@techblitz.com",
  redirect_to: "https://techblitz.dev/api/user/update",
} as EmailUpdateProps;

const main = {
  backgroundColor: "#000000",
  color: "#FFFFFF",
  fontFamily: "'Onest', Verdana, sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#FFFFFF",
  fontSize: "32px",
  fontWeight: "500",
  lineHeight: "24px",
  margin: "40px 0",
  textAlign: "center" as const,
};

const text = {
  color: "#FFFFFF",
  fontSize: "14px",
  lineHeight: "24px",
  textAlign: "center" as const,
  fontFamily: "'Onest', Verdana, sans-serif",
};

const footer = {
  marginTop: "32px",
  textAlign: "center" as const,
};

const footerText = {
  color: "#CCCCCC",
  fontSize: "12px",
  lineHeight: "16px",
  fontFamily: "'Onest', Verdana, sans-serif",
};

const footerLink = {
  color: "#CCCCCC",
  fontSize: "12px",
  lineHeight: "16px",
  textDecoration: "underline",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const accent = "#5b61d6";

const button = {
  backgroundColor: accent,
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "10px 28px",
  fontFamily: "'Onest', Verdana, sans-serif",
};
