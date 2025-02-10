import { CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { motion } from 'framer-motion';
import { UserTimeSpendingPerDay } from '@prisma/client';
import { Button } from '@/components/ui/button';

interface TimeCommitmentOption {
  label: string;
  value: UserTimeSpendingPerDay;
  description: string;
}

const timeCommitmentOptions: TimeCommitmentOption[] = [
  {
    label: '5 minutes per day',
    value: UserTimeSpendingPerDay.LESS_THAN_5_MINUTES,
    description: 'I just want to dip my toes in',
  },
  {
    label: '10 minutes per day',
    value: UserTimeSpendingPerDay.BETWEEN_5_AND_15_MINUTES,
    description: 'I want to learn something new',
  },
  {
    label: '20 minutes per day',
    value: UserTimeSpendingPerDay.BETWEEN_15_AND_30_MINUTES,
    description: 'I want to make steady progress',
  },
  {
    label: '30 minutes per day',
    value: UserTimeSpendingPerDay.BETWEEN_30_AND_60_MINUTES,
    description: 'I want to build projects and land my first tech job',
  },
];

export default function OnboardingTimeCommitment() {
  const { itemVariants, handleSetUserTimeSpendingPerDay } = useOnboardingContext();

  return (
    <>
      <CardHeader>
        <div className="flex flex-col items-center gap-y-2 mb-3">
          <motion.h1
            className="text-2xl flex flex-col items-center font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent text-center"
            variants={itemVariants}
          >
            What's your daily coding goal?
          </motion.h1>
          <motion.p className="text-sm text-gray-500 text-center" variants={itemVariants}>
            This will help us tailor the content to your needs
          </motion.p>
        </div>
        <div className="flex flex-col gap-y-4">
          {timeCommitmentOptions.map((option) => (
            <motion.div key={option.value} variants={itemVariants}>
              <Button
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6 text-white border-black-50"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{option.label}</h3>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardHeader>
    </>
  );
}
