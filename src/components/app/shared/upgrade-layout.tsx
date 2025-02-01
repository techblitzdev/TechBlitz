import { CheckCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function UpgradeLayout(opts: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <Card className="border border-black-50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl md:text-5xl font-extrabold">
              <span className="bg-clip-text text-transparent text-gradient from-white/55 to-white py-1">
                {opts.title}
              </span>
            </CardTitle>
            <CardDescription className="text-gray-300">{opts.description}</CardDescription>
          </CardHeader>
          <CardContent className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center text-white">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Personalized Roadmaps
                </h3>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center text-white">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  AI-Powered Recommendations
                </h3>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center text-white">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Advanced Analytics
                </h3>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center text-white">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  Premium Content Access
                </h3>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-10 md:flex-row md:justify-between md:space-y-0">
            <p className="text-lg text-gray-300">
              Upgrade to Premium and supercharge your coding journey!
            </p>
            <Button
              href="https://dub.sh/upgrade-techblitz"
              variant="accent"
              size="lg"
              target="_blank"
            >
              Upgrade to Premium
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
