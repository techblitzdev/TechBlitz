'use client';
import { Button } from '@/components/ui/button';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';

export const CheckoutForm = ({ productPrice }: { productPrice: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    // prevent the default form submission
    event.preventDefault();

    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });

    // update the user record with the payment id
    console.log(result);
    setLoading(false);

    return result;
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl font-bold">Payment: £{productPrice / 100}</h3>
        <PaymentElement />
      </div>
      <Button type="submit" disabled={!stripe}>
        {loading ? <ReloadIcon className="w-3 h-3 animate-spin" /> : 'Submit'}
      </Button>
    </form>
  );
};
