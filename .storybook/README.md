# Server Components with Storybook

This document provides guidance on how to use server components with Storybook in our Next.js App Router application.

## The Challenge

Storybook does not natively support React Server Components (RSC). When trying to use server components directly in Storybook, you'll encounter errors because:

1. Server components cannot be imported directly into client components
2. Server-side data fetching methods don't work in the Storybook environment
3. Async components are not supported in the current Storybook setup

## Our Solution

We've implemented a pattern that allows us to create stories for server components without modifying the actual components:

1. Create client-side story wrappers that mimic the structure and functionality of server components
2. Use mock data instead of actual data fetching
3. Leverage helper functions to reduce boilerplate code

## How to Use

### 1. Import the Helper Functions

```tsx
import { createServerComponentStory } from '../../../.storybook/ServerComponentStory';
import { StoryDecorator } from '../../../.storybook/storybook-components';
```

### 2. Create a Client-Side Story Component

Create a component that mimics your server component's structure:

```tsx
function MyServerComponentStory(props) {
  // Define mock data here
  const mockData = {...};

  return (
    <StoryDecorator>
      {/* Mimic your server component's UI here */}
      <YourComponent {...mockData} />
    </StoryDecorator>
  );
}
```

### 3. Configure the Story

Use the `createServerComponentStory` helper function:

```tsx
const meta = createServerComponentStory(MyServerComponentStory, {
  title: 'App/YourCategory/YourComponent',
}) satisfies Meta<typeof MyServerComponentStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Your story args here
  },
};
```

## Example

Here's an example for a `QuestionHistory` component:

```tsx
// question-history.stories.tsx
import { createServerComponentStory } from '../../../../.storybook/ServerComponentStory';
import { StoryDecorator } from '../../../../.storybook/storybook-components';

function QuestionHistoryStory({ hasAnswers = true }) {
  // Mock data that resembles what the server component would fetch
  const recentAnswers = hasAnswers ? [...mockAnswers] : [];

  return (
    <StoryDecorator>
      <Card className="border-black-50 bg-card-dark">
        {/* UI that matches our server component */}
        <CardHeader>
          <CardTitle>Recent Questions</CardTitle>
        </CardHeader>
        <CardContent>{/* Component content */}</CardContent>
      </Card>
    </StoryDecorator>
  );
}

const meta = createServerComponentStory(QuestionHistoryStory, {
  title: 'App/Statistics/QuestionHistory',
});

export default meta;

export const Default: Story = {
  args: { hasAnswers: true },
};

export const Empty: Story = {
  args: { hasAnswers: false },
};
```

## Mock Authentication and Data

For components that require authentication or data fetching, use the helpers in `storybook-components/index.tsx`:

```tsx
import {
  StoryDecorator,
  MockPrisma,
  DefaultMockUser,
} from '../../../.storybook/storybook-components';

function AuthenticatedComponentStory() {
  return (
    <StoryDecorator user={DefaultMockUser}>
      <YourComponent />
    </StoryDecorator>
  );
}
```

## Advantages of This Approach

1. Server components remain untouched and can use server-side features
2. Stories are isolated and don't depend on actual backend functionality
3. Consistent styling and behavior across stories
4. Reduced boilerplate code
