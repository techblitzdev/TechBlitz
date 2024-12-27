import type { MDXComponents } from 'mdx/types';
import MdxLink from '@/components/mdx/mdx-link';
import MdxHeading from '@/components/mdx/mdx-heading';

import CallToActionBlock from '@/components/marketing/global/call-to-action-block';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <MdxLink {...props} href={props.href || ''} />,
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
    CallToActionBlock,
    ...components,
  };
}
