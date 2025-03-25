import React from 'react';

/**
 * ServerComponentStory is a helper function for creating Storybook stories
 * for React Server Components. It allows you to create a client-side wrapper
 * around a server component's structure for use in Storybook.
 *
 * @param Component - The client component that will mimic the server component's structure
 * @param options - Options for configuring the story
 * @returns A configured Meta object for Storybook
 */
export function createServerComponentStory<T extends React.ComponentType<any>>(
  Component: T,
  options: {
    title: string;
    parameters?: Record<string, any>;
    decorators?: Array<(Story: any) => JSX.Element>;
    tags?: string[];
  }
) {
  return {
    title: options.title,
    component: Component,
    parameters: {
      layout: 'centered',
      backgrounds: {
        default: 'dark',
        values: [{ name: 'dark', value: '#090909' }],
      },
      ...options.parameters,
    },
    decorators: options.decorators || [
      (Story: any) => (
        <div
          style={{
            maxWidth: '100%',
            margin: '1rem',
            background: 'var(--background)',
            borderRadius: '8px',
          }}
        >
          <Story />
        </div>
      ),
    ],
    tags: options.tags || ['autodocs'],
  };
}
