'use client';
import SignupForm from '@/components/auth/signup';
import { ERROR_CODES } from '@/utils/constants/error-codes';
import { useGetQueryParams } from '@/utils/get-query-params';
import { Suspense, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { ErrorCodes } from '@/types/Constants'; // Import the ErrorCodes type
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  // if on prod, boot return to login
  if (process.env.NEXT_PUBLIC_ENV === 'production') {
    return (
      <div className="text-center">
        <h2 className="text-3xl !font-onest !font-medium !leading-[1.1] text-gradient from-white to-white/75">
          Signup is disabled
        </h2>
        <p className="text-gray-300 mt-2">
          Please contact support for more information.
        </p>
        <div className="flex gap-4 items-center justify-self-center">
          <Button
            href="/"
            variant="default"
            className="mt-4"
          >
            Back to homepage
          </Button>
          <Button
            href="mailto:loganfordwd@gmail.com"
            variant="secondary"
            className="mt-4"
          >
            Contact
          </Button>
        </div>
      </div>
    );
  }

  const ranToast = useRef(false);
  const [params, setUrlParams] = useState({});

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupContent
        ranToast={ranToast.current}
        setUrlParams={setUrlParams}
      />
    </Suspense>
  );
}

function SignupContent({
  ranToast,
  setUrlParams
}: {
  ranToast: boolean;
  setUrlParams: any;
}) {
  // check if we have any query parameters
  const urlParams = useGetQueryParams({
    keys: ['r', 'email']
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
        position: 'bottom-right'
      });
    } else {
      toast.error(errorDetail.title, {
        description: errorDetail.description,
        duration: 5000,
        position: 'bottom-right'
      });
    }
  }

  return (
    <div className="bg-black-100 border border-black-50 p-8 rounded-xl space-y-4 text-center">
      <h1 className="font-bold text-3xl mb-2">Join today!</h1>
      <p className="text-gray-300 mb-8 text-sm font-satoshi text-wrap">
        And become a part of the fastest growing community <br /> of developers.
      </p>
      <SignupForm prefilledEmail={urlParams?.email || ''} />
    </div>
  );
}
