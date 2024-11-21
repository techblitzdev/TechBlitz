import Link from 'next/link';

export default async function AdminPage() {
  return (
    <div className="font-inter">
      <h1 className="font-bold text-3xl">
        <Link
          href="/admin/questions"
          className="bg-primary text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2"
        >
          To Questions
        </Link>
      </h1>
    </div>
  );
}
