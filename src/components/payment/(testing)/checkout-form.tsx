'use client';
import { Button } from '@/components/ui/button';
import {
  useStripe,
  useElements,
  PaymentElement
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { updateUserSubscription } from '@/actions/user/authed/update-user-subscription';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { StripeProduct } from '@/types/StripeProduct';
import { CheckIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { InputWithLabel } from '@/components/ui/input-label';
import { useUser } from '@/hooks/useUser';
import { getBaseUrl } from '@/utils';

export default function CheckoutForm(opts: {
  productPrice: number;
  product: StripeProduct;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripeSubscriptionItemId: string;
  priceId: string;
}) {
  const {
    productPrice,
    product,
    stripeCustomerId,
    stripeSubscriptionId,
    stripeSubscriptionItemId,
    priceId
  } = opts;
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

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
        stripeCustomerId: string;
        stripeSubscriptionId: string;
        stripeSubscriptionItemId: string;
      };
    }) => {
      return updateUserSubscription({
        ...subscriptionData,
        priceId
      });
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.error || 'Failed to update subscription');
      }
    },
    onError: (error) => {
      toast.error('Error updating subscription');
      console.error('Subscription update error:', error);
    }
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
            return_url: `${getBaseUrl()}/dashboard?payment=success`
          },
          redirect: 'if_required'
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
            productId: product.id,
            stripeCustomerId,
            stripeSubscriptionId,
            stripeSubscriptionItemId
          }
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
    <form
      onSubmit={handleSubmit}
      className="p-5 flex flex-col gap-y-2"
    >
      <div className="flex gap-8">
        <div className="space-y-4">
          <h3 className="text-sm font-light space-y-1">
            <span>
              Subscribe to {product.name} <br />
            </span>
            <span className="text-3xl">£{(productPrice / 100).toFixed(2)}</span>
            <span className="text-xs"> per month, billed monthly </span>
          </h3>
          <Separator />
          <div className="flex flex-col gap-y-3">
            {product?.features?.map((feature) => (
              <div
                key={product.id + feature.name}
                className="flex gap-x-2 items-center"
              >
                <div className="bg-accent p-0.5 rounded-full">
                  <CheckIcon className="size-3" />
                </div>
                <span className="text-sm font-satoshi">{feature.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 w-full">
          <h3 className="text-xl">Payment details</h3>
          <InputWithLabel
            label="Email address"
            name="email"
            type="email"
            autoComplete="email"
            value={user?.email}
            disabled
          />
          <PaymentElement
            options={{
              layout: 'auto'
            }}
          />
          <Button
            type="submit"
            disabled={
              !stripe || isSubmitting || updateSubscriptionMutation.isPending
            }
            variant="secondary"
            className="w-full mt-4"
          >
            {isSubmitting || updateSubscriptionMutation.isPending ? (
              <ReloadIcon className="size-3 animate-spin mr-2" />
            ) : null}
            {isSubmitting ? 'Processing...' : 'Submit Payment'}
          </Button>
        </div>
      </div>
    </form>
  );
}
