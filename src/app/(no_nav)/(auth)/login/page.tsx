import LoginForm from "@/components/auth/login";

import { createMetadata } from "@/utils/seo";

export async function generateMetadata() {
  return createMetadata({
    title: "Login | TechBlitz",
    description: "Login to your account to continue.",
    image: {
      text: "Login | TechBlitz",
      bgColor: "#000",
      textColor: "#fff",
    },
    canonicalUrl: "/login",
  });
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectUrl: string; onboarding: string };
}) {
  const { redirectUrl, onboarding } = searchParams;

  return (
    <div
      className="border border-black-50 p-8 rounded-xl space-y-4 text-center"
      style={{
        background:
          "radial-gradient(128% 107% at 0% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)",
      }}
    >
      <h1 className="font-bold text-3xl mb-2">Welcome back!</h1>
      <p className="text-gray-300 mb-8 text-sm font-satoshi text-wrap">
        Sign in to your account to continue.
      </p>
      <LoginForm redirectUrl={redirectUrl} onboarding={onboarding} />
    </div>
  );
}
