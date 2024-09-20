import Link from 'next/link';

export default function AdminButton({ ...props }) {
  return (
    <Link
      href="/admin/questions"
      className="text-blue-500 hover:underline cursor-pointer"
      prefetch
    >
      To admin page
    </Link>
  );
}
