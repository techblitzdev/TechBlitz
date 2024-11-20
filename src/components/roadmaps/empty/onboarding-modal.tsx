// components
import { fetchRoadmapQuestionViaOrder } from '@/actions/roadmap/questions/fetch-roadmap-question-via-order';
import { fetchAllRoadmapQuestions } from '@/actions/roadmap/questions/fetch-roadmap-questions';
import NoDailyQuestion from '@/components/global/errors/no-daily-question';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export default async function RoadmapOnboardingModal() {
  // get the first 'default' roadmap question
  const firstQuestion = await fetchRoadmapQuestionViaOrder(1);

  return (
    <Dialog open={true}>
      <DialogContent
        className="bg-black-75 md:max-w-xl"
        showCloseButton={false}
      >
        {!firstQuestion || !firstQuestion.uid ? (
          <NoDailyQuestion />
        ) : (
          <>
            <DialogTitle className="text-3xl">Welcome to roadmaps</DialogTitle>
            <DialogDescription className="flex flex-col gap-y-1 mt-3 text-white font-satoshi">
              <p>
                Roadmaps are personalised learning paths, curated for your needs
                in order to grow as a developer.
              </p>
              <p>
                We just need to know a little bit more about you to get started.
                This will help us to create a roadmap that is tailored to you.
              </p>
            </DialogDescription>
          </>
        )}
        <DialogFooter>
          <div className="flex items-center gap-x-1 mt-5 w-full justify-end">
            <Button className="h-full" href="/dashboard" variant="default">
              Back to dashboard
            </Button>
            <Button
              href={`/roadmap/onboarding/1`}
              className="h-full"
              variant="accent"
            >
              Let's get started!
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
