import { CardHeader } from '@/components/ui/card';
import BookBookmark from '@/components/ui/icons/book-bookmark';
import Star3 from '@/components/ui/icons/star';
import { useOnboardingContext } from '@/contexts/onboarding-context';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function OnboardingFirstQuestionSelection() {
  const { itemVariants, firstQuestionSelection, setFirstQuestionSelection } =
    useOnboardingContext();

  return (
    <CardHeader className="flex flex-col gap-y-4 max-w-xl relative">
      <div className="flex flex-col gap-y-5 mb-3">
        <motion.h1
          className="text-2xl flex flex-col font-medium bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          Where would you like to begin?
        </motion.h1>
        <motion.button
          className={cn(
            'group border border-black-50 rounded-lg p-4 text-start hover:bg-accent transition-all duration-300',
            firstQuestionSelection === 'startFromScratch' && 'bg-accent text-white'
          )}
          variants={itemVariants}
          onClick={() => {
            setFirstQuestionSelection('startFromScratch');
          }}
        >
          <div className="flex items-center gap-x-4">
            <BookBookmark fill="#4A90E2" secondaryfill="#F5A623" width="40" height="40" />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium font-onest text-xl text-white">Start from scratch</p>
              <p
                className={cn(
                  'text-sm text-gray-500 group-hover:text-white',
                  firstQuestionSelection === 'startFromScratch' && 'text-white'
                )}
              >
                We'll start you off with a basic tutorial to get you started.
              </p>
            </div>
          </div>
        </motion.button>
        <motion.button
          className={cn(
            'group flex flex-col gap-y-2 border border-black-50 rounded-lg p-4 text-start hover:bg-accent transition-all duration-300',
            firstQuestionSelection === 'personalizeLearning' && 'bg-accent text-white'
          )}
          variants={itemVariants}
          onClick={() => setFirstQuestionSelection('personalizeLearning')}
        >
          <div className="flex items-center gap-x-4">
            <Star3 fill="#F5A623" width="40" height="40" />
            <div className="flex flex-col gap-y-1">
              <p className="font-medium font-onest text-xl text-white">Personalize your learning</p>
              <p
                className={cn(
                  'text-sm text-gray-500 group-hover:text-white',
                  firstQuestionSelection === 'personalizeLearning' && 'text-white'
                )}
              >
                Select topics that interest you and get a set of recommended questions to get you
                started.
              </p>
            </div>
          </div>
        </motion.button>
      </div>
    </CardHeader>
  );
}
