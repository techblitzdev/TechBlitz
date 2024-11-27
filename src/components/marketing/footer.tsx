import Link from 'next/link';
import Logo from '../global/logo';

export default function MarketingFooter() {
  return (
    <footer className="mx-break-out bg-black-75 py-8">
      <div className="flex justify-between text-white container">
        <div className="flex flex-col gap-y-8 w-full">
          <Logo />
          <div className="flex w-full justify-between items-center">
            <p className="text-xs">
              &copy; 2024 techblitz. All rights reserved.
            </p>
            <ul className="flex items-center gap-x-4 text-xs">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-accent duration-300"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-accent duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-accent duration-300"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div></div>
      </div>
    </footer>
  );
}
