import React from 'react'
import Image from 'next/image'
import { Check, X, Info } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export interface FeatureValue {
  value: boolean | string | number
  tooltip?: string
}

export interface Feature {
  name: string
  yourCompany: FeatureValue
  otherCompany: FeatureValue
}

interface ComparisonTableProps {
  features: Feature[]
  yourCompanyName: string
  otherCompanyName: string
  yourCompanyLogo?: string
  otherCompanyLogo?: string
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  features,
  yourCompanyName,
  otherCompanyName,
  yourCompanyLogo,
  otherCompanyLogo,
}) => {
  return (
    <div className="w-full overflow-auto rounded-lg border border-black-50 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%] text-white font-onest">
              Feature
            </TableHead>
            <TableHead className="text-center text-white font-onest">
              <div className="flex items-center justify-center space-x-2">
                {yourCompanyLogo && (
                  <Image
                    src={yourCompanyLogo || '/placeholder.svg'}
                    alt={yourCompanyName}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>{yourCompanyName}</span>
              </div>
            </TableHead>
            <TableHead className="text-center text-white font-onest">
              <div className="flex items-center justify-center space-x-2">
                {otherCompanyLogo && (
                  <Image
                    src={otherCompanyLogo || '/placeholder.svg'}
                    alt={otherCompanyName}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>{otherCompanyName}</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? 'bg-[#000000]' : 'bg-black'}
            >
              <TableCell className="font-medium p-2 text-lg font-onest">
                {feature.name}
              </TableCell>
              <TableCell className="text-center p-2 text-lg font-onest">
                {renderFeatureValue(feature.yourCompany)}
              </TableCell>
              <TableCell className="text-center p-2 text-lg font-onest">
                {renderFeatureValue(feature.otherCompany)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const renderFeatureValue = (featureValue: FeatureValue) => {
  const { value, tooltip } = featureValue
  const content = (
    <>
      {typeof value === 'boolean' ? (
        value ? (
          <Check className="inline-block w-6 h-6 text-green-500" />
        ) : (
          <X className="inline-block w-6 h-6 text-red-500" />
        )
      ) : (
        <span className="text-sm font-semibold">{value}</span>
      )}
    </>
  )

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center space-x-1 cursor-help">
            {content}
            <Info className="w-4 h-4 text-gray-400" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    content
  )
}

export default ComparisonTable
