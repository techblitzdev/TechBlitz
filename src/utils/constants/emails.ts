export const STUDY_REMINDER_EMAIL_SUBJECT = (userDisplayName: string) => [
  `Keep the momentum going, ${userDisplayName}!`,
  `${userDisplayName} - you got this!`,
  `Don't stop now, ${userDisplayName}!`,
  `👋 ${userDisplayName}, don't forget your goal!`,
  `${userDisplayName} make yourself proud, carry on your journey!`,
  `😢 ${userDisplayName} don't leave me hanging...`,
];

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
  `👋 ${userDisplayName}! Got 3 minutes?`,
];

/**
 * An array of different strings that we can use for the suggested challenge email description
 */
export const SUGGESTED_CHALLENGE_EMAIL_DESCRIPTION = (userDisplayName: string) => [
  `Your next challenge is hand-picked to help you grow as a developer. Ready to showcase your skills, ${userDisplayName}?`,
  `${userDisplayName}, Level up your coding prowess with your next exciting challenge. The perfect way to keep your skills sharp!`,
  `${userDisplayName}, Challenge yourself, learn something new, and join a community of developers improving their skills today.`,
  `${userDisplayName}, Quick break? Perfect timing! We've got an engaging coding challenge that will only take you a few minutes.`,
  `Your daily opportunity to become a better developer is here. Dive into your next challenge!`,
  `Keep your coding momentum going! Your next challenge is waiting for your unique solution.`,
  `Transform your coffee break into a learning opportunity with today's brain-teasing challenge.`,
  `Join the community of developers pushing their limits today. Your next challenge awaits!`,
];

/**
 * These are sent to users who have not completed a challenge in 7 days.
 *
 * @param userDisplayName
 * @returns
 */
export const SUGGESTED_CHALLENGE_EMAIL_7_DAYS = (userDisplayName: string) => [
  {
    subject: `${userDisplayName}, your coding streak is getting lonely! 🥺`,
    description: `Your keyboard misses you! Let's reignite that coding spark with a quick 3-minute challenge that'll get you back in the groove. Ready to code? 🚀`,
  },
  {
    subject: `${userDisplayName}, it's me, not you`,
    description: `I get it, you're busy. But you haven't completed a challenge in 7 days. Take just 3 minutes and get back on track!`,
  },
  {
    subject: `Howdy ${userDisplayName}, you're missing out on a lot of fun!`,
    description: `We've missed seeing you around! It's been 7 days since your last challenge. Take just 3 minutes to jump back in and keep building your skills!`,
  },
  {
    subject: `${userDisplayName}! Your next coding victory awaits! 🌟`,
    description: `The best developers know that consistency is key - and we've saved an exciting challenge just for you! Take 3 minutes to flex those coding muscles and keep your skills sharp. Ready to crush it?`,
  },
  {
    subject: `Was it something I said, ${userDisplayName}?`,
    description: `It's been 7 days since you last completed a challenge. Take just 3 minutes to get back in the groove and keep building your skills!`,
  },
];
