import Link from 'next/link';
import Logo from '../global/logo';
import { Button } from '../ui/button';

export default function MarketingNavigation() {
  return (
    <div className="flex items-center justify-between">
      <Logo />
      <nav className="bg-black border border-black-50 rounded-2xl py-2 px-4">
        <ul className="flex items-center gap-x-6 font-satoshi">
          <li className="text-white hover:text-accent duration-300 hover:cursor-pointer">
            <Link href="/platform">Platform</Link>
          </li>
          <li className="text-white hover:text-accent duration-300 hover:cursor-pointer">
            <Link href="/pricing">Pricing</Link>
          </li>
          <li className="text-white hover:text-accent duration-300 hover:cursor-pointer">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Button variant="secondary">Get Started</Button>
    </div>
  );
}
