import { UserRecord } from "@/types/User";
import { Camera } from "lucide-react";
import { getUserDisplayName } from "@/utils/user";
import ProfileImage from "./profile-image";
import ProfilePicture from "@/components/ui/profile-picture";

export default async function ProfileHero(opts: {
  userProfileData: UserRecord;
  user: UserRecord | null;
}) {
  const { userProfileData, user } = opts;

  return (
    <section className="relative h-64 w-full bg-black-100 border-b border-black-50">
      <div className="absolute top-8 right-8">
        <Camera className="size-8 text-white" />
      </div>
      <div className="absolute flex flex-col md:flex-row items-center gap-10 bottom-[calc(-96px)] md:bottom-[-64px] left-6">
        {user?.uid === userProfileData.uid ? (
          <ProfileImage user={userProfileData} />
        ) : (
          <ProfilePicture
            src={userProfileData?.userProfilePicture ?? ""}
            alt={`${getUserDisplayName(userProfileData)}'s profile photo`}
            className="relative size-48 rounded-full border-4 border-black-50"
          />
        )}
        <div className="flex flex-col gap-y-1">
          <h1 className="text-6xl font-bold text-gradient from-white/55 to-white">
            {getUserDisplayName(userProfileData)}
          </h1>
        </div>
      </div>
    </section>
  );
}
