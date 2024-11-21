import { Button } from '../../ui/button';
import RoadmapOnboardingModal from './onboarding-modal';

// this serves as a 'fallback' component if the modal for whatever
// reason does not render
export default function RoadmapOnboarding() {
  return (
    <>
      <div className="h-full flex flex-col text-center container gap-y-4 w-full justify-center items-center">
        <div className="space-y-2">
          <h2 className="font-semibold text-3xl">Welcome to Roadmaps!</h2>
          <p className="font-satoshi text-sm">
            Roadmaps are personalised learning paths, curated for your needs in
            order to grow as a developer.
            <br />
            Let's get started!
          </p>
        </div>
        <Button variant="accent">Create your first roadmap</Button>
      </div>
      <RoadmapOnboardingModal />
    </>
  );
}
