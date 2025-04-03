import { redirect } from 'next/navigation';
import BlogPage from '../../page';

interface PaginatedBlogPageProps {
  params: {
    page: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function PaginatedBlogPage({ params, searchParams }: PaginatedBlogPageProps) {
  const page = parseInt(params.page, 10);

  // Redirect to the main blog page if page is 1
  if (page === 1) {
    redirect('/blog');
  }

  // Pass the page number to the main blog page component
  return <BlogPage searchParams={{ ...searchParams, page: params.page }} />;
}
