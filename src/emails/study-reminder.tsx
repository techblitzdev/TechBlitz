import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface StudyReminderEmailProps {
  userName: string;
  studyPathTitle: string;
  progress: number;
  daysRemaining: number;
  currentStep: number;
  totalSteps: number;
}

export default function StudyReminderEmail({
  userName,
  studyPathTitle,
  progress,
  daysRemaining,
  currentStep,
  totalSteps,
}: StudyReminderEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your Daily Study Reminder for {studyPathTitle}</Preview>
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Study Reminder
          </Heading>
          <Text className="text-black text-[14px] leading-[24px]">Hi {userName},</Text>
          <Text className="text-black text-[14px] leading-[24px]">
            This is your daily reminder to continue your learning journey in {studyPathTitle}.
          </Text>
          <Section className="my-[32px]">
            <Text className="text-black text-[14px] leading-[24px]">Your Progress:</Text>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <Text className="text-black text-[14px] leading-[24px]">
              Step {currentStep} of {totalSteps} ({progress}% complete)
            </Text>
          </Section>
          <Text className="text-black text-[14px] leading-[24px]">
            You have {daysRemaining} days remaining to reach your goal.
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            Keep up the great work! Your dedication to learning is impressive.
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            Best regards,
            <br />
            The TechBlitz Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
