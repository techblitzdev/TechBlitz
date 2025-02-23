import RouterBack from '@/components/app/shared/router-back';
import UpgradePageComponent from '@/components/shared/payment/upgrade-page';
import StarsBackground from '@/components/ui/stars-background';

export default function UpgradePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <StarsBackground />
      <div className="absolute top-6 left-6">
        <RouterBack />
      </div>
      <UpgradePageComponent />
    </div>
  );
}
