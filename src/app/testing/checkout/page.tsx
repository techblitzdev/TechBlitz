'use client';
import { getStripeProducts } from '@/actions/stripe/stripe-products';
import { useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
//import { stripe } from '@/lib/stripe';
import CheckoutTest from '@/components/payment/(testing)/checkout';
import { loadStripe } from '@stripe/stripe-js';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);

export default function SubscriptionTestPage() {
  //const products = await getStripeProducts();

  // return (
  //   <div className="container py-12 text-white flex flex-col gap-y-4">
  //     <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
  //       Subscription Test Page
  //     </h1>
  //     <h6>Products:</h6>
  //     {products.map((product) => (
  //       <div key={product.id}>
  //         <h6>name: {product.name}</h6>
  //         <p>description: {product.description}</p>
  //       </div>
  //     ))}
  //   </div>
  // );

  if (!stripe) {
    return <div>Stripe is not initialized</div>;
  }

  return (
    <Elements stripe={stripe}>
      <CheckoutTest />
    </Elements>
  );
}
