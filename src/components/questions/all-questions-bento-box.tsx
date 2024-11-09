import Chip from '../global/chip';
import { Separator } from '../ui/separator';

export default function AllQuestionsDashboardBentoBox() {
  return (
    <section className="h-full">
      <div className="space-y-3">
        <Chip color="accent" text="Questions" />
        <h6 className="text-lg lg:text-xl">View all Questions</h6>
      </div>
    </section>
  );
}
