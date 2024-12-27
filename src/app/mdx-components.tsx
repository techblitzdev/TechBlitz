import type { MDXComponents } from 'mdx/types';
import MdxLink from '@/components/mdx/mdx-link';
import CallToActionBlock from '@/components/marketing/global/call-to-action-block';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <MdxLink {...props} href={props.href || ''} />,
    CallToActionBlock,
    ...components,
  };
}
