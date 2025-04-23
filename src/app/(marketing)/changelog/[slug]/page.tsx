import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getChangelogEntry } from '@/lib/changelog';
import { createMetadata } from '@/utils/seo';
import { getBaseUrl } from '@/utils';
import type { WebPageJsonLd } from '@/types';

interface ChangelogEntryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ChangelogEntryPageProps) {
  const entry = await getChangelogEntry(params.slug);

  if (!entry) {
    return createMetadata({
      title: 'Changelog Entry Not Found | TechBlitz',
      description: 'The requested changelog entry could not be found.',
    });
  }

  return createMetadata({
    title: `${entry.title} | TechBlitz Changelog`,
    description: entry.description,
    image: {
      text: entry.title,
      bgColor: '#000',
      textColor: '#fff',
    },
    canonicalUrl: `/changelog/${entry.slug}`,
  });
}

export default async function ChangelogEntryPage({ params }: ChangelogEntryPageProps) {
  const entry = await getChangelogEntry(params.slug);

  if (!entry) {
    notFound();
  }

  const jsonLd: WebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${getBaseUrl()}/changelog/${entry.slug}`,
    headline: entry.title,
    description: entry.description,
    image: entry.image || 'https://techblitz.dev/favicon.ico',
    datePublished: entry.date,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: getBaseUrl(),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Changelog',
          item: `${getBaseUrl()}/changelog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: entry.title,
          item: `${getBaseUrl()}/changelog/${entry.slug}`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 py-32">
        <div className="mb-8">
          <Link href="/changelog" className="text-white/70 hover:text-white transition-colors">
            ← Back to Changelog
          </Link>
        </div>

        <article className="prose prose-invert max-w-none">
          <header className="mb-8">
            {entry.date && <p className="text-sm text-neutral-400 mb-2">{entry.date}</p>}
            <h1 className="text-4xl font-bold mb-4">{entry.title}</h1>
          </header>

          {entry.content}
        </article>
      </div>
    </>
  );
}
