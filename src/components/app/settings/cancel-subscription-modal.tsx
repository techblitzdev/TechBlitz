"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import CancelSubscriptionButton from "./cancel-subscription-button";
import { UserWithOutAnswers } from "@/types/User";
import { Button } from "@/components/ui/button";

export default function CancelSubscriptionModal(opts: {
  user: UserWithOutAnswers;
}) {
  const { user } = opts;

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive" className="mt-4">
          Cancel subscription
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-black-75 md:max-w-xl gap-2"
        aria-label="Cancel subscription modal"
      >
        <DialogTitle className="text-2xl">Cancel subscription</DialogTitle>
        <DialogDescription className="flex flex-col gap-y-1">
          <p>
            We're sorry to see you go! If you cancel your subscription, you'll
            lose access to all premium features at the end of the current
            billing cycle.
          </p>
        </DialogDescription>
        <DialogFooter>
          <CancelSubscriptionButton user={user} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
