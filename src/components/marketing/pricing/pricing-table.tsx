import { Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { entireFeatureList } from '@/utils/constants/pricing';

export default function PricingTable() {
  return (
    <div className="space-y-8 w-full max-w-3xl mx-auto">
      <Card className="border-none font-onest">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="text-white">
                <TableHead className="text-left text-white">Plans</TableHead>
                <TableHead className="text-left text-white">Free</TableHead>
                <TableHead className="text-left text-white">Pro</TableHead>
                <TableHead className="text-left text-white">Lifetime</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-white">
              {Object.entries(entireFeatureList).map(([sectionKey, section]) => (
                <>
                  <TableRow key={`${sectionKey}-header`} className="hover:bg-transparent">
                    <TableCell
                      colSpan={4}
                      className="text-left font-semibold text-lg pt-12 hover:bg-transparent"
                    >
                      {section.title}
                    </TableCell>
                  </TableRow>
                  {section.features.map((feature, index) => (
                    <TableRow key={`${sectionKey}-${index}`} className="hover:bg-transparent">
                      <TableCell className="text-left">{feature.name}</TableCell>
                      <TableCell className="text-left">
                        {feature.free ? (
                          <Check className="size-4 text-gray-400" />
                        ) : (
                          <X className="size-4 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell className="text-left">
                        {feature.premium ? (
                          <Check className="size-4 text-gray-400" />
                        ) : (
                          <X className="size-4 text-gray-400" />
                        )}
                      </TableCell>
                      <TableCell className="text-left">
                        {feature.lifetime ? (
                          <Check className="size-4 text-gray-400" />
                        ) : (
                          <X className="size-4 text-gray-400" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
