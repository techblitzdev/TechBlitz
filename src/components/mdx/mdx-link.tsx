import Link from "next/link";
import { AnchorHTMLAttributes } from "react";

interface MdxLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function MdxLink({ href, children, ...props }: MdxLinkProps) {
  const isInternalLink = href && href.startsWith("/");
  const isAnchorLink = href && href.startsWith("#");

  if (isInternalLink) {
    return (
      <Link href={href} className="text-accent hover:underline" {...props}>
        {children}
      </Link>
    );
  }

  if (isAnchorLink) {
    return (
      <a href={href} className="text-accent hover:underline" {...props}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:underline"
      {...props}
    >
      {children}
    </a>
  );
}
