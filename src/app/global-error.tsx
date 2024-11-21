/* eslint-disable no-restricted-exports */
'use client';

import NextError from 'next/error.js';
import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: { digest?: string } & Error;
}) {
  return (
    <html lang="en-US">
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
