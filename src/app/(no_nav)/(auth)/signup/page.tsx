'use client';

import SignupForm from '@/components/auth/signup';
import { ERROR_CODES } from '@/utils/constants/error-codes';
import { useGetQueryParams } from '@/utils/get-query-params';
import { Suspense, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { ErrorCodes } from '@/types/Constants'; // Import the ErrorCodes type

export default function SignupPage() {
  const ranToast = useRef(false);
  const [params, setUrlParams] = useState({});

  console.log(params);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent ranToast={ranToast.current} setUrlParams={setUrlParams} />
    </Suspense>
  );
}

function SignupContent({
  ranToast,
  setUrlParams,
}: {
  ranToast: boolean;
  setUrlParams: any;
}) {
  // check if we have any query parameters
  const urlParams = useGetQueryParams({
    keys: ['r'],
  });

  // if we have a query parameter, we can use it to display a toast message
  if (
    Object.keys(urlParams).length > 0 &&
    urlParams.r === 'no-user' &&
    !ranToast
  ) {
    ranToast = true;

    // Cast the query parameter to one of the valid keys in ErrorCodes
    const firstError = urlParams.r as keyof ErrorCodes;

    // set the params to the first error
    setUrlParams(urlParams);

    // Now TypeScript knows that firstError is a valid key of ERROR_CODES
    const errorDetail = ERROR_CODES[firstError];

    if (typeof errorDetail === 'string') {
      toast.error(errorDetail, {
        duration: 5000,
        position: 'bottom-right',
      });
    } else {
      toast.error(errorDetail.title, {
        description: errorDetail.description,
        duration: 5000,
        position: 'bottom-right',
      });
    }
  }

  return (
    <div className="container text-white h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-3xl">Sign up page</h1>
      <SignupForm />
    </div>
  );
}