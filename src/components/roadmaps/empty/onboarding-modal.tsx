// components
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

export default function RoadmapOnboardingModal() {
  return (
    <Dialog open={true}>
      <DialogContent
        className="bg-black-75 md:max-w-xl"
        showCloseButton={false}
      >
        <DialogTitle className="text-2xl">
          Welcome to roadmaps on TechBlitz!
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-y-1 text-white font-satoshi">
          <p>
            Roadmaps are personalised learning paths, curated for your needs in
            order to grow as a developer.
          </p>
          <p>
            We just need to know a little bit more about you to get started.
            This will help us to create a roadmap that is tailored to your
            needs.
          </p>
        </DialogDescription>
        <DialogFooter>
          <div className="flex items-center gap-x-1 mt-5 w-full justify-end">
            <Button variant="default">Back to dashboard</Button>
            <Button variant="accent">Let's get started!</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
