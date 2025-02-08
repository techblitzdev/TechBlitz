'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

/**
 * Modal where the open state will be controlled by local storage
 * Asks users for a testimonial
 */
export default function TestimonialModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [testimonial, setTestimonial] = useState('');

  const { setValue: setHasBeenShown, value: hasBeenShown } = useLocalStorage({
    key: 'testimonial-modal-shown',
    defaultValue: false,
  });

  useEffect(() => {
    if (!hasBeenShown) {
      setIsOpen(true);
    }
  }, [hasBeenShown]);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenShown(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the testimonial to your backend
    console.log('Testimonial submitted:', testimonial);
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-black-75 text-white border border-black-50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Sorry to bother you...</DialogTitle>
          <DialogDescription>
            But we'd love to hear about your experience with our TechBlitz. Your feedback helps us
            improve and inspires others. As a thank you, you will receive 10% off of our premium
            plans.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              By pressing submit, you give us permission to use your testimonial on our website and
              social media.
            </p>
            <Button variant="premium" type="submit" disabled={!testimonial.trim()}>
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
