import { User } from 'lucide-react';
import { Suspense } from 'react';
import LoadingSpinner from './loading';

export default function ProfilePicture(opts: {
  src?: string | null;
  alt: string | null;
}) {
  const { src, alt } = opts;

  // if no src, return a placeholder
  if (!src) {
    return (
      <div className="rounded-full size-6 flex items-center justify-center bg-black-50">
        <User className="size-4" />
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <img
        src={src}
        className="rounded-full size-6"
        alt={alt || 'User Profile Picture'}
      />
    </Suspense>
  );
}
