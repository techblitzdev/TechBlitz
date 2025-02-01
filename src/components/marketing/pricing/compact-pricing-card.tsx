import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plan } from "@/utils/constants/pricing";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";

interface CompactPricingCardProps {
  product: Plan;
  onSelect: (plan: Plan) => void;
  isSelected: boolean;
}

export default function CompactPricingCard({
  product,
  onSelect,
  isSelected,
}: CompactPricingCardProps) {
  if (!product) return null;

  const isFree = !product.price;

  return (
    <Card
      style={{
        background:
          "radial-gradient(128% 107% at 0% 0%, #212121 0%, rgb(0,0,0) 77.61%)",
      }}
      className={cn(
        "flex-1 group-hover:scale-[1.03] duration-300 bg-black-75 flex flex-col justify-between h-full border-black-50",
        product.mostPopular && "border-accent",
        isSelected && "ring-2 ring-accent",
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-1 text-start">
          <div className="flex w-full justify-between items-center">
            <h3 className="font-onest text-white text-lg">{product.name}</h3>
            {product.mostPopular && (
              <div className="bg-accent rounded-lg text-white text-xs px-2 py-0.5 font-semibold">
                Popular
              </div>
            )}
          </div>
          <div className="flex gap-x-1 items-center">
            <div className="flex gap-x-1 items-center font-onest text-gradient from-white to-white/75">
              <span className="text-base font-semibold">
                {product.currencySymbol}
              </span>
              <NumberFlow
                value={product.price}
                className="text-3xl font-onest text-white"
              />
            </div>
            <span className="text-xs font-inter mb-0.5 text-gray-300">
              {product.frequencyText}
            </span>
          </div>
        </div>
      </CardHeader>

      <Separator className="bg-black-50" />

      <CardContent className="text-start py-2 flex flex-col gap-y-2 justify-between h-full text-white">
        <Button
          fullWidth
          variant={isSelected ? "accent" : "secondary"}
          onClick={() => onSelect(product)}
        >
          {isSelected ? "Selected" : isFree ? "Choose Free" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
}
