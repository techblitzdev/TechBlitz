/**
 * An array of different strings that we can use for the suggested challenge email subject
 */
export const SUGGESTED_CHALLENGE_EMAIL_SUBJECT = (userDisplayName: string) => [
  `Hi ${userDisplayName}, your next coding adventure awaits!`,
  `Hey ${userDisplayName}, ready to crack your next coding puzzle?`,
  `Howdy ${userDisplayName}, your next personalized challenge is here!`,
  `Hi ${userDisplayName}, time to level up your coding game!`,
  `Hey ${userDisplayName}, we've got an exciting challenge for you!`,
  `Hi ${userDisplayName}, challenge yourself and grow today!`,
  `Howdy ${userDisplayName}, here's your daily dose of coding!`,
  `What's up ${userDisplayName}? Ready for your next coding challenge?`,
];

/**
 * An array of different strings that we can use for the suggested challenge email description
 */
export const SUGGESTED_CHALLENGE_EMAIL_DESCRIPTION = (
  userDisplayName: string,
) => [
  `Your next challenge is hand-picked to help you grow as a developer. Ready to showcase your skills, ${userDisplayName}?`,
  `${userDisplayName}, Level up your coding prowess with your next exciting challenge. The perfect way to keep your skills sharp!`,
  `${userDisplayName}, Challenge yourself, learn something new, and join a community of developers improving their skills today.`,
  `${userDisplayName}, Quick break? Perfect timing! We've got an engaging coding challenge that will only take you a few minutes.`,
  `Your daily opportunity to become a better developer is here. Dive into your next challenge!`,
  `Keep your coding momentum going! Your next challenge is waiting for your unique solution.`,
  `Transform your coffee break into a learning opportunity with today's brain-teasing challenge.`,
  `Join the community of developers pushing their limits today. Your next challenge awaits!`,
];
