export interface MarketingContentGridProps {
  title: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
}

type MarketingContentGridComponentProps = {
  title: string;
  subheading?: string;
  items: MarketingContentGridProps[];
  center?: boolean;
};

/**
 * A 3 x 2 grid to display features & selling points of
 * a particular feature or product.
 */
export default function MarketingContentGrid({
  title,
  subheading,
  items,
  center = false,
}: MarketingContentGridComponentProps) {
  return (
    <section className="lg:max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-16 pb-24 lg:pb-36">
      <h6 className="lg:px-6 text-3xl md:text-5xl !font-onest !font-medium tracking-tight text-gradient from-white to-white/75 py-1">
        {title}
      </h6>
      {subheading && (
        <span className="w-full mt-2 lg:px-6 max-w-4xl block text-gray-400 font-onest">
          {subheading}
        </span>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-6 mt-10 lg:mt-3">
        {items?.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-3 lg:p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 ${
              center ? "items-center" : ""
            }`}
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
