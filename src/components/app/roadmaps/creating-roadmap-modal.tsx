import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function CreatingRoadmapModal() {
  return (
    <DialogContent className="bg-black-75 md:max-w-3xl max-h-[1000px] overflow-y-scroll">
      <DialogHeader>
        <DialogTitle className="text-2xl">Creating your personalized roadmap...</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div className="flex flex-col gap-y-4">
          <p>We are currently creating your roadmap. This may take a few minutes.</p>
        </div>
      </DialogDescription>
      <DialogFooter>
        <Button>Cancel</Button>
      </DialogFooter>
    </DialogContent>
  );
}
