import { SVGProps } from 'react';

export default function TableOfContentsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE */}
      <path
        fill="currentColor"
        d="M3 9h14V7H3zm0 4h14v-2H3zm0 4h14v-2H3zm16 0h2v-2h-2zm0-10v2h2V7zm0 6h2v-2h-2z"
      ></path>
    </svg>
  );
}
