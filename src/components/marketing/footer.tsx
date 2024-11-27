import Logo from '../global/logo';

export default function MarketingFooter() {
  return (
    <footer className="bottom-0 bg-black-75 border border-black-50 p-4 rounded-lg">
      <div className="flex justify-between text-white">
        <div className="flex flex-col gap-y-8">
          <Logo />
          <p className="text-sm">&copy; 2024 techblitz. All rights reserved.</p>
        </div>
        <div>
          <ul className="flex items-center gap-x-4 text-sm">
            <li>
              <a
                href="/terms"
                className="hover:text-accent duration-300"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-accent duration-300"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
