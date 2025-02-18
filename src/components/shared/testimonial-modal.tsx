'use client';

import type React from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useState, useEffect, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { sendFeedback } from '@/actions/misc/send-feedback';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

const EMOJI_RATINGS = [
  { emoji: '😢', label: 'Disappointed' },
  { emoji: '😕', label: 'Not great' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😊', label: 'Like it' },
  { emoji: '😍', label: 'Love it' },
];

export default function TestimonialModal({
  userHasAnsweredAnyQuestion,
}: {
  userHasAnsweredAnyQuestion: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [testimonial, setTestimonial] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const { setValue: setHasBeenShown, value: hasBeenShown } = useLocalStorage({
    key: 'testimonial-modal-shown',
    defaultValue: false,
  });

  useEffect(() => {
    if (!hasBeenShown && userHasAnsweredAnyQuestion) {
      setIsOpen(true);
    }
  }, [hasBeenShown, userHasAnsweredAnyQuestion]);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenShown(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendFeedback({ feedback: testimonial, emoji: selectedEmoji || undefined });
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="bg-black-75 text-white border border-black-50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl">Sorry to bother you...</DialogTitle>
          <DialogDescription>
            But we'd love to hear about your experience with our TechBlitz. Your feedback helps us
            improve and inspires others. As a thank you, you will receive 10% off of our premium
            plans.
          </DialogDescription>
          <DialogClose asChild>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={(e) => startTransition(() => handleSubmit(e))} className="space-y-4">
          <div className="space-y-2">
            <Label>How would you rate your experience?</Label>
            <div className="flex gap-4">
              {EMOJI_RATINGS.map(({ emoji, label }) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                    selectedEmoji === emoji ? 'bg-black-50' : 'hover:bg-black-50'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs mt-1 text-gray-400">{label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="testimonial">Your Feedback</Label>
            <Textarea
              id="testimonial"
              placeholder="Tell us what you think..."
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <p className="text-sm text-gray-500">
              By pressing submit, you give TechBlitz permission to use your testimonial, profile
              picture, and name on our website and social media.
            </p>
            <Button
              variant="premium"
              type="submit"
              disabled={!testimonial.trim() || !selectedEmoji || isPending}
            >
              {isPending ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
