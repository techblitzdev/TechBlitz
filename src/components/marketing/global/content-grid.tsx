export interface MarketingContentGridProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

type MarketingContentGridComponentProps = {
  items: MarketingContentGridProps[];
};

/**
 * A 3 x 2 grid to display features & selling points of
 * a particular feature or product.
 */
export default function MarketingContentGrid({
  items
}: MarketingContentGridComponentProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-2">
              <div className="text-accent">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item?.title}</h3>
            </div>
            <p className="text-sm text-gray-400 font-onest">
              {item?.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
