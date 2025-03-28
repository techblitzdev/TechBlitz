<img src="https://pbs.twimg.com/profile_banners/1110662360564408321/1736793148/1500x500" alt="Logo">
<div align="center">
  <h3><a href="https://www.techblitz.dev">TechBlitz</a></h3>
</div>

<div align="center">
   <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/techblitzdev/techblitz">
   <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/techblitzdev/techblitz">
   <img alt="GitHub branch status" src="https://img.shields.io/github/checks-status/techblitzdev/techblitz/main">
</div>

## Overview

TechBlitz is designed to empower developers by providing a comprehensive platform for learning, practicing, and improving technical skills. Unlike traditional coding platforms, we focus on holistic developer growth across various technologies and skill levels, without taking your hours to complete, as well as being a mobile-friendly platform. Complete coding challenges from any device, anywhere.

## Features

- **Adaptive Learning Paths**: [Personalized coding challenges generated through a series of onboarding questions to gauge your strengths and weaknesses.](https://techblitz.dev/features/roadmap)
- **Coding questions**: [Repetition in the form of daily questions, and streaks to ensure you never miss a day!](https://www.techblitz.dev/features/coding-challenges)
- **Skill Tracking**: [Monitor your progress and identify areas for improvement](https://techblitz.dev/features/statistics)
- **100's of questions**: A wide variety of short-form coding questions to test your knowledge (more being added everyday!)
- **Leaderboard**: Battle with other users for a chance to win prizes at the end of each month!
- **Community-Driven**: Open-source and community-powered platform
- **Statistics**: [Analysis your current skillset, and be guided on how to improve.](https://techblitz.dev/features/statistics)

## Roadmap

We love to be transparent with our users, so below are the next features we have planned.

- **Roadmaps**: Sharing roadmaps with other users
- **TechBlitz for schools**: Education groups, create your student's questions, roadmaps and allow them to battle with one another for the top spot of the class!
- **Social**: Profiles, friends/coworkers
- **Statistics**: A more in-depth statistics dashboard, giving you a greater insight on your current ability.
- **Multi-language support**: Currently we only support JavaScript. However, we are looking into: Python, Typescript, and GoLang for our first wave of other languages to support.
- **Searching**: Implement elastic search to easily find questions that you want to answer
- **Slack bot**: Daily challenges sent to a Slack channel of your choice. Compete with co-workers and learn new skills!

## Tech stack

- **Frameworks/libraries**: [React](https://react.dev/) + [Next.js](https://nextjs.org/) (app router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn](https://ui.shadcn.com/), [Aceternity](https://ui.aceternity.com/), [MagicUi](https://magicui.design/)
- **Backend (auth, database, storage)**: [Supabase](https://supabase.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Hosting**: [Vercel](https://vercel.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Data fetching**: [Tanstack Query](https://tanstack.com/)
- **Emails**: [Resend](https://resend.com/) + [React Email](https://react.email/)
- **Short links**: [Dub](https://dub.co/)
- **Component Testing**: [StoryBook](https://storybook.js.org/)

### Installation

1. Clone the repository
   ```bash
   git clone git@github.com:techblitzdev/TechBlitz.git
   ```
2. Install dependencies

   ```bash
   cd techblitz
   pnpm install
   ```

3. Run the development server
   ```bash
   pnpm run dev
   ```

### Supabase Setup

Documentation for Supabase coming soon 🚀

### Running StoryBook

StoryBook is used for component development and testing in isolation. Follow these steps to work with StoryBook:

1. Start the StoryBook development server:

   ```bash
   pnpm run storybook
   ```

2. Create story files for components:

   - Each component must have a `[component-name].stories.tsx` file in the same directory
   - Follow the naming convention: `Button.stories.tsx` for `Button.tsx`
   - Stories should showcase different states and variations of the component

3. Basic story file structure:

   ```tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { ComponentName } from './ComponentName';

   const meta: Meta<typeof ComponentName> = {
     title: 'UI/ComponentName',
     component: ComponentName,
   };

   export default meta;
   type Story = StoryObj<typeof ComponentName>;

   export const Default: Story = {
     args: {
       // Component props
     },
   };
   ```

4. Best practices:

   - Include multiple stories for different component states
   - Add documentation using JSDoc comments
   - Test edge cases and error states
   - Use controls to make props interactive
   - Add accessibility tests where applicable

5. Build static StoryBook (for deployment):
   ```bash
   pnpm run build-storybook
   ```

## Contributing

We welcome contributions! Please see our <a href="https://github.com/techblitzdev/TechBlitz/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a> for details.

## Feedback

If you have any feedback, please reach out to us at team@techblitz.dev

## Security

You can view our security policy [here](https://github.com/techblitzdev/TechBlitz/blob/main/SECURITY.MD)

## License

[Apache-2.0](http://www.apache.org/licenses/)
