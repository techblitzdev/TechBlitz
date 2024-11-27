import Link from 'next/link';
import Logo from '../global/logo';
import { Button } from '../ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

export default function MarketingNavigation() {
  return (
    <div className="flex items-center justify-between container">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="bg-black border border-black-50 rounded-2xl py-2 px-4 hidden md:block">
        <ul className="flex items-center gap-x-8 font-inter text-sm">
          <li className="text-white hover:text-gray-400 duration-300 hover:cursor-pointer">
            <Link href="/platform">Platform</Link>
          </li>
          <li className="text-white hover:text-gray-400 duration-300 hover:cursor-pointer">
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className="text-white hover:text-gray-400 duration-300 hover:cursor-pointer">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="items-center gap-x-2 hidden md:flex">
        <Button
          href="/login"
          variant="default"
        >
          Login
        </Button>
        <Button
          href="signup"
          variant="secondary"
        >
          Get Started
        </Button>
      </div>
      <HamburgerMenuIcon className="size-5 block md:hidden" />
    </div>
  );
}