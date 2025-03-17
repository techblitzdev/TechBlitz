import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getUpgradeUrl } from '@/utils';

export default function UpgradeLayout(opts: {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <Card className="border border-black-50 bg-[#090909] max-w-lg text-center">
          <CardHeader className="space-y-1 px-6 pb-3">
            <CardTitle className="text-xl md:text-3xl font-extrabold">
              <span className="bg-clip-text text-transparent text-gradient from-white/55 to-white py-1">
                {opts.title}
              </span>
            </CardTitle>
            {opts.description && (
              <CardDescription className="text-gray-300 text-sm">
                {opts.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardFooter className="mt-3 flex flex-col items-center gap-10 md:flex-row md:justify-center">
            <Button href={getUpgradeUrl()} variant="accent" size="lg" target="_blank">
              Find out more
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
