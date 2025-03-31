import type { MDXComponents } from 'mdx/types';
import MdxLink from '@/components/mdx/mdx-link';
import MdxHeading from '@/components/mdx/mdx-heading';
import CodeSnippet from '@/components/marketing/global/code-snippet';
import CallToActionBlock from '@/components/marketing/global/blocks/call-to-action-block';
import MdxQuestionDisplay from '@/components/mdx/mdx-question-display';
import MdxList from './components/mdx/mdx-list';
import { Button } from './components/ui/button';
import Callout from './components/mdx/callout';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <MdxLink {...props} href={props.href || ''} />,
    ul: (props) => <MdxList {...props}>{props.children}</MdxList>,
    ol: (props) => (
      <MdxList {...props} ordered>
        {props.children}
      </MdxList>
    ),
    button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <Button {...(props as any)}>{props.children}</Button>
    ),
    h1: (props) => (
      <MdxHeading {...props} heading="h1">
        {props.children}
      </MdxHeading>
    ),
    h2: (props) => (
      <MdxHeading {...props} heading="h2">
        {props.children}
      </MdxHeading>
    ),
    h3: (props) => (
      <MdxHeading {...props} heading="h3">
        {props.children}
      </MdxHeading>
    ),
    h4: (props) => (
      <MdxHeading {...props} heading="h4">
        {props.children}
      </MdxHeading>
    ),
    h5: (props) => (
      <MdxHeading {...props} heading="h5">
        {props.children}
      </MdxHeading>
    ),
    h6: (props) => (
      <MdxHeading {...props} heading="h6">
        {props.children}
      </MdxHeading>
    ),
    CodeSnippet: (props: any) => {
      const withDefaults = {
        lightTheme: props.lightTheme || 'github-dark',
        darkTheme: props.darkTheme || 'github-dark',
        code: props.children,
        ...props,
      };

      return (
        <div className="mt-3">
          <CodeSnippet {...withDefaults} language="javascript" filename="index.js" />
        </div>
      );
    },
    Callout: (props: any) => <Callout {...props}>{props.children}</Callout>,
    CallToActionBlock,
    MdxQuestionDisplay,
    ...components,
  };
}
