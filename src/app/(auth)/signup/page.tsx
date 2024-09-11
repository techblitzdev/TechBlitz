'use client'
import SignupForm from '@/components/auth/signup'
import { ERROR_CODES } from '@/utils/constants/error-codes';
import { getQueryParams } from '@/utils/get-query-params'
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import type { ErrorCodes } from '@/types/Constants'; // Import the ErrorCodes type

export default function SignupPage() {
  const ranToast = useRef(false);
  const [params, setUrlParams] = useState({});


  // check if we have any query parameters
  const urlParams = getQueryParams({
    keys: ['r']
  });

  // if we have a query parameter, we can use it to display a toast message
  if (
    Object.keys(urlParams).length > 0 &&
    urlParams.r === 'no-user' &&
    !ranToast.current
  ) {  
    ranToast.current = true;

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

  console.log(JSON.stringify(params));

  return (
    <div className="container text-white h-screen flex flex-col items-center justify-center py-20">
      <h1 className="font-bold text-3xl">Sign up page</h1>
      <SignupForm />
    </div>
  );
}
