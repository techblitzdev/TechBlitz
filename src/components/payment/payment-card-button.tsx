'use client';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CheckoutForm from './(testing)/checkout-form';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import { createSubscription } from '@/actions/stripe/stripe-subscription';
import { useState } from 'react';
import type { StripeProduct } from '../../types/StripeProduct';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSubscription } from '@/hooks/useSubscription';
import { useUser } from '@/hooks/useUser';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const getClientSecret = async (
  product: StripeProduct
): Promise<{
  subscriptionId: string;
  clientSecret: string | null;
  customerId: string;
  stripeSubscriptionItemId: string;
} | null> => {
  const response = await createSubscription(product.default_price.id);
  if (!response || !response.clientSecret) return null;
  return response;
};

export function PaymentButton(opts: { product: StripeProduct }) {
  const { product } = opts;
  const { user } = useUser();
  // get the user's current subscription (if any)
  const { data: subscription } = useSubscription(user?.uid);

  const [loading, setLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeCustomerId, setStripeCustomerId] = useState<string>('');
  const [stripeSubscriptionId, setStripeSubscriptionId] = useState<string>('');
  const [stripeSubscriptionItemId, setStripeSubscriptionItemId] =
    useState<string>('');
  const [priceId, setPriceId] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClientSecret = async (plan: StripeProduct) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      [plan.id]: true,
    }));

    try {
      const response = await getClientSecret(plan);

      if (!response) {
        toast.error('Failed to create subscription');
        return;
      }

      setClientSecret(response.clientSecret);
      setStripeCustomerId(response.customerId);
      setStripeSubscriptionId(response.subscriptionId);
      setStripeSubscriptionItemId(response.stripeSubscriptionItemId);
      setPriceId(plan.default_price.id);
      setOpen(true);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while trying to create the subscription');
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        [plan.id]: false,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={async () => await handleClientSecret(product)}
          className="flex gap-x-2 min-w-[84px] duration-300 ease-in-out"
          variant={product.metadata.mostPopular ? 'accent' : 'secondary'}
          disabled={
            subscription?.productId === product.id ||
            (!subscription?.productId &&
              product.default_price?.unit_amount === 0)
          }
          fullWidth
        >
          {loading[product.id] ? (
            <ReloadIcon className="size-3 animate-spin" />
          ) : (
            <div className="font-satoshi">
              {subscription?.productId === product.id ||
              (!subscription?.productId &&
                product.default_price?.unit_amount === 0)
                ? 'Current plan'
                : 'Upgrade'}
            </div>
          )}
        </Button>
      </DialogTrigger>
      {clientSecret && (
        <DialogContent className=" bg-black-900 w-fit md:w-[50rem]">
          <Elements
            stripe={stripe}
            options={{
              clientSecret,
              appearance: {
                variables: { colorBackground: 'black', colorText: 'white' },
              },
            }}
          >
            <CheckoutForm
              productPrice={product.default_price?.unit_amount as number}
              product={product}
              stripeCustomerId={stripeCustomerId}
              stripeSubscriptionId={stripeSubscriptionId}
              stripeSubscriptionItemId={stripeSubscriptionItemId}
              priceId={priceId}
            />
          </Elements>
        </DialogContent>
      )}
    </Dialog>
  );
}
