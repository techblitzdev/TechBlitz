'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { CheckCircle, Zap } from 'lucide-react';
import { getUpgradeUrl } from '@/utils';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function UpgradeModal() {
  const { value: hasBeenShown, setValue: setHasBeenShown } = useLocalStorage({
    key: 'upgrade-modal-shown',
    defaultValue: false,
  });

  const handleClose = () => {
    setHasBeenShown(true);
  };

  const features = [
    'AI-powered question explanations',
    'Custom question creation',
    'Roadmap building',
    'Custom statistics reports',
    '+ more!',
  ];

  return (
    <Dialog open={!hasBeenShown} onOpenChange={handleClose}>
      <DialogContent className="bg-black-75 text-white md:max-w-2xl p-8 rounded-lg shadow-2xl">
        <DialogTitle className="text-3xl font-bold flex items-center">
          <Zap className="size-8 text-yellow-400 mr-2" />
          Supercharge Your Learning
        </DialogTitle>
        <DialogDescription className="mb-6">
          Take your TechBlitz experience to the next level with our premium features:
        </DialogDescription>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center p-2 rounded-lg">
              <CheckCircle className="size-5 text-green-400 mr-3 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <DialogFooter className="flex flex-col items-center justify-end mt-6">
          <Button
            variant="ghost"
            onClick={handleClose}
            size="lg"
            className=" text-gray-400 hover:text-white"
          >
            Maybe later
          </Button>
          <Button variant="premium" size="lg" href={getUpgradeUrl()}>
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
