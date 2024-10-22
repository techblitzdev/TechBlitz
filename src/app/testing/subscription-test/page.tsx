import { getStripeProducts } from '@/actions/stripe/stripe-products';

export default async function SubscriptionTestPage() {
  const products = await getStripeProducts();

  return (
    <div className="container py-12 text-white flex flex-col gap-y-4">
      <h1 className="text-xl md:text-3xl font-satoshi font-semibold">
        Subscription Test Page
      </h1>
      <h6>Products:</h6>
      {products.map((product) => (
        <div key={product.id}>
          <h6>{product.name}</h6>
          <p>{product.description}</p>
          <p>{product.metadata?.price}</p>
        </div>
      ))}
    </div>
  );
}
