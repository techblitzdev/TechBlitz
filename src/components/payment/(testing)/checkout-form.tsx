'use client';
import { Button } from '@/components/ui/button';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { updateUserSubscription } from '@/actions/user/update-user-subscription';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function CheckoutForm(opts: {
  productPrice: number;
  productId: string;
}) {
  const { productPrice, productId } = opts;
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create mutation for updating subscription
  const updateSubscriptionMutation = useMutation({
    mutationFn: async (subscriptionData: {
      subscription: {
        startDate: Date;
        endDate: Date;
        active: boolean;
        planId: string;
        productId: string;
        planTrial: boolean;
        planTrialDays: number | null;
      };
    }) => {
      return updateUserSubscription({
        ...subscriptionData,
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(`Subscription updated successfully ${data}`);
      } else {
        toast.error(data.error || 'Failed to update subscription');
      }
    },
    onError: (error) => {
      toast.error('Error updating subscription');
      console.error('Subscription update error:', error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error('Stripe is not initialized');
      return;
    }

    try {
      setIsSubmitting(true);

      // Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment(
        {
          elements,
          confirmParams: {
            return_url: window.location.href,
          },
          redirect: 'if_required',
        }
      );

      if (stripeError) {
        toast.error(stripeError.message || 'Payment failed');
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Calculate subscription dates
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() + 1);

        // Update subscription in your database
        await updateSubscriptionMutation.mutateAsync({
          subscription: {
            startDate,
            endDate,
            active: true,
            planId: paymentIntent.id,
            planTrial: false,
            planTrialDays: null,
            productId: productId,
          },
        });

        toast.success('Payment successful!');
      } else {
        toast.error('Payment status unclear. Please contact support.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-4">
        <h3 className="text-2xl font-bold">
          Payment: £{(productPrice / 100).toFixed(2)}
        </h3>
        <PaymentElement
          options={{
            layout: 'accordion',
            defaultValues: {
              billingDetails: {
                address: {
                  city: 'London',
                  country: 'GB',
                  line1: '123 Fake St',
                  line2: 'Apt 2',
                  postal_code: 'E1 4UD',
                  state: 'London',
                },
                email: 'hello@devdaily.com',
                name: 'John Doe',
              },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={
          !stripe || isSubmitting || updateSubscriptionMutation.isPending
        }
        variant="secondary"
        className="w-full"
      >
        {isSubmitting || updateSubscriptionMutation.isPending ? (
          <ReloadIcon className="size-3 animate-spin mr-2" />
        ) : null}
        {isSubmitting ? 'Processing...' : 'Submit Payment'}
      </Button>
    </form>
  );
}
