import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';

export default function StudentDiscountBlock() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg p-4 sm:p-6 text-white shadow-lg">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-8">
          <GraduationCap className="w-12 h-12" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Students Save 30%!</h2>
            <p className="text-blue-100">
              Unlock your full potential and claim your student discount
            </p>
          </div>
        </div>
        <Button href="mailto:team@techblitz.dev" variant="premium" className="w-full sm:w-auto">
          Claim Discount
        </Button>
      </div>
    </div>
  );
}
