import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { addToWaitlist } from '@/actions/waitlist/add';
import posthog from 'posthog-js';
import { InputWithLabel } from '@/components/ui/input-label';

export default function WaitlistSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    setIsSubmitting(true);
    try {
      await addToWaitlist(email);
      setIsSubmitting(false);
      toast.success('You have been added to the waitlist!');
      posthog.capture('waitlist_signup', { email });
      setEmail('');
    } catch (error) {
      setIsSubmitting(false);
      toast.error('Failed to add you to the waitlist. Please try again');
    }
  };

  return (
    <div className="w-full">
      <h4 className="text-xl font-semibold mb-2">Join Our Waitlist</h4>
      <p className="text-sm mb-2 font-onest">
        Enjoyed this question? Get notified when we launch!
      </p>
      <div className="space-y-3">
        <InputWithLabel
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email Address"
          wrapperclassname="w-full"
          className="w-full"
          inputClassName="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="button"
          disabled={isSubmitting}
          onClick={handleSignup}
          className="w-full font-onest !bg-gradient-to-r !from-accent !via-accent/90 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
        >
          {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
        </Button>
      </div>
    </div>
  );
}
