import { useRouter, useSearchParams } from 'next/navigation';

export const updateQueryParams = (key: string, value: string | null) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  router.push(`?${params.toString()}`);
};
