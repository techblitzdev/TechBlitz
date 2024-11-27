export default function MarketingFooter() {
  return (
    <footer className="bottom-0">
      <div className="flex items-center justify-between text-white">
        <div>
          <p className="text-sm">
            &copy; 2021 Company Name. All rights reserved.
          </p>
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
