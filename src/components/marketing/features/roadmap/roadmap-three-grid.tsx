import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Rocket, Target, Zap } from 'lucide-react';

export default function FeatureRoadmapThreeGridBlock() {
  return (
    <section className="py-16 px-4 md:py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Feature Roadmap
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Rocket className="h-8 w-8 text-primary" />}
            title="Launch"
            description="Kickstart your project with our powerful tools and resources."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="Optimize"
            description="Fine-tune your processes for maximum efficiency and productivity."
          />
          <FeatureCard
            icon={<Target className="h-8 w-8 text-primary" />}
            title="Scale"
            description="Grow your business with our scalable solutions and expert support."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
