import { Button } from "@/components/ui/button";
import { useUserServer } from "@/hooks/use-user-server";
import { Code, FileQuestion, Flame } from "lucide-react";
import ProfilePicture from "@/components/ui/profile-picture";

export default async function LeaderboardFeaturesRight() {
  const user = await useUserServer();

  const badges = [
    {
      name: "100 Questions",
      icon: <FileQuestion className="size-6 text-yellow-400" />,
      description: "Solved 100 coding questions",
    },
    {
      name: "10 Day Streak",
      icon: <Flame className="size-6 text-orange-400" />,
      description: "Coded for 10 consecutive days",
    },
    {
      name: "Open Source",
      icon: <Code className="size-6 text-green-400" />,
      description: "Contributed to TechBlitz",
    },
  ];

  return (
    <div className="col-span-full md:col-span-6 pb-0 md:py-12 pt-4 p-0 md:p-12 flex flex-col gap-10">
      <div className="flex flex-col items-center gap-y-6 h-auto md:h-72 overflow-hidden relative">
        <div className="flex flex-col items-center gap-y-2">
          <ProfilePicture
            src={user?.userProfilePicture || ""}
            alt={user?.username || "User"}
            className="rounded-full aspect-square size-12"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold">{user?.username || "You"}</h2>
            <p className="text-sm text-gray-400">Level 5 Developer</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-3 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200 border border-black-50"
              style={{
                background:
                  "radial-gradient(128% 107% at 50% 0%,#212121 0%,rgb(0,0,0) 77.61472409909909%)",
              }}
            >
              <div className="p-2">{badge.icon}</div>
              <p className="text-sm font-medium text-center font-onest">
                {badge.name}
              </p>
              <p className="text-xs text-gray-400 text-center font-onest">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
        <div className="z-10 absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#000000] to-transparent pointer-events-none"></div>
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Earn rewards for your progress
        </h3>
        <p className="text-gray-400 font-onest">
          Level up your skills, earn badges, and compete with friends on the
          leaderboard.
        </p>
        <Button href="#" variant="secondary" disabled>
          Coming soon!
        </Button>
      </div>
    </div>
  );
}
