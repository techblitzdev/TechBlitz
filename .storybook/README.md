# Server Components with Storybook

This document provides guidance on how to use server components with Storybook in our Next.js App Router application.

## The Challenge

Storybook does not natively support React Server Components (RSC). When trying to use server components directly in Storybook, you'll encounter errors because:

1. Server components cannot be imported directly into client components
2. Server-side data fetching methods don't work in the Storybook environment
3. Async components are not supported in the current Storybook setup

## Our Solution

We use a simple pattern to render server components in Storybook:

1. Wrap the server component in a Suspense boundary
2. Import the server component directly in the story file
3. Let the experimental RSC support in Storybook handle the rendering
