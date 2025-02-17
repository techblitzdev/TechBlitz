import { CardHeader } from '@/components/ui/card';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { motion } from 'framer-motion';
import { UserTimeSpendingPerDay } from '@prisma/client';
import { Button } from '@/components/ui/button';

interface TimeCommitmentOption {
  label: string;
  value: UserTimeSpendingPerDay;
  description: string;
  labelDescription: string;
  databaseValue: UserTimeSpendingPerDay;
}

const timeCommitmentOptions: TimeCommitmentOption[] = [
  {
    label: '5 minutes per day',
    value: UserTimeSpendingPerDay.LESS_THAN_5_MINUTES,
    labelDescription: 'Laid back',
    description: 'I just want to dip my toes in',
    databaseValue: 'LESS_THAN_5_MINUTES',
  },
  {
    label: '10 minutes per day',
    value: UserTimeSpendingPerDay.BETWEEN_5_AND_15_MINUTES,
    labelDescription: 'Steady',
    description: 'I want to learn something new',
    databaseValue: 'BETWEEN_5_AND_15_MINUTES',
  },
  {
    label: '20 minutes per day',
    value: UserTimeSpendingPerDay.BETWEEN_15_AND_30_MINUTES,
    labelDescription: 'Consistent',
    description: 'I want to make steady progress',
    databaseValue: 'BETWEEN_15_AND_30_MINUTES',
  },
  {
    label: '30 minutes per day',
    value: UserTimeSpendingPerDay.BETWEEN_30_AND_60_MINUTES,
    labelDescription: 'Focused',
    description: 'I want to build projects and land my first tech job',
    databaseValue: 'BETWEEN_30_AND_60_MINUTES',
  },
];

export default function OnboardingTimeCommitment() {
  const { itemVariants, setTimeSpendingPerDay, timeSpendingPerDay, user } = useOnboardingContext();

  return (
    <>
      <CardHeader>
        <div className="flex flex-col gap-y-2 mb-3">
          <motion.h1
            className="text-2xl flex flex-col font-medium bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            {user.username}, what's your daily coding goal?
          </motion.h1>
          <motion.p className="text-sm text-gray-500" variants={itemVariants}>
            This will help us tailor the content to your needs
          </motion.p>
        </div>
        <div className="flex flex-col gap-y-4">
          {timeCommitmentOptions.map((option) => (
            <motion.div key={option.value} variants={itemVariants}>
              <Button
                onClick={() => setTimeSpendingPerDay(option.value)}
                variant="outline"
                className={`group w-full justify-start text-left h-auto py-4 px-6 text-white border-black-50 ${
                  timeSpendingPerDay === option.value ? 'bg-accent text-white' : ''
                }`}
              >
                <div className="flex items-center gap-4 justify-between w-full">
                  <h3 className="font-semibold">{option.label}</h3>
                  <p
                    className={`text-sm ${
                      timeSpendingPerDay === option.value ? 'text-white' : 'text-gray-400'
                    } group-hover:text-white`}
                  >
                    {option.labelDescription}
                  </p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardHeader>
    </>
  );
}
