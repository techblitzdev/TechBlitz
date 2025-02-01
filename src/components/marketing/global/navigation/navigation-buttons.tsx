import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import GithubLogo from '@/components/ui/icons/github';
import { useUserServer } from '@/hooks/use-user-server';

export default async function NavigationButtons() {
  const user = await useUserServer();
  const isLoggedIn = Boolean(user?.email);

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-x-2">
        <GithubStars />
        <a
          href="/dashboard"
          className="px-4 py-2 rounded-md text-sm font-medium hidden lg:block font-onest bg-secondary text-black border border-black-50"
        >
          Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="items-center gap-x-2 hidden lg:flex">
      <GithubStars hideText={false} />
      <Button href="/login" variant="default">
        Login
      </Button>
      <Button
        href={'/signup'}
        variant="accent"
        className="font-onest !bg-gradient-to-r !from-accent !via-white/20 !to-accent animate-shimmer bg-[length:200%_100%] transition-colors"
      >
        Get started
        <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}

export function GithubStars(opts: { hideText?: boolean }) {
  const { hideText = false } = opts;

  return (
    <Button
      href="https://git.new/blitz"
      target="_blank"
      variant="ghost"
      className="relative group hover:text-gray-400 transition-all duration-200 font-onest px-0 lg:px-4"
    >
      <div className="flex items-center gap-x-2">
        <div className="size-4">
          <GithubLogo />
        </div>
        {!hideText && <span className="font-medium hidden xl:block">Star us</span>}
      </div>
    </Button>
  );
}
