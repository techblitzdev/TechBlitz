'use client';

import { getUserDisplayName } from '@/utils/user';

import ProfilePicture from '@/components/ui/profile-picture';
import { Input } from '@/components/ui/input';
import type { UserRecord } from '@/types';
import { toast } from 'sonner';
import { useState } from 'react';
import { TooltipContent, TooltipProvider, TooltipTrigger, Tooltip } from '@/components/ui/tooltip';

export default function ProfileImage(opts: { user: UserRecord }) {
  const { user } = opts;

  const [userProfilePicture, setUserProfilePicture] = useState(user?.userProfilePicture);

  const onProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?.uid || !event.target.files) return;

    const formData = new FormData();
    formData.append('files', event.target.files[0]);
    formData.append('userId', user.uid);
    formData.append('route', 'user-profile-pictures');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const { logoUrl } = await res.json();

      if (logoUrl) {
        toast.success('Profile picture updated successfully');
      }

      // set the user profile picture to the new url
      setUserProfilePicture(logoUrl);
    } catch (e) {
      console.error(e);
      toast.error('Failed to upload profile picture');
    }
  };

  return (
    <div className="relative w-48 h-48 rounded-full border-4 border-black-50">
      {user?.uid === user.uid ? (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="cursor-pointer block w-full h-full">
              <label htmlFor="logo-file-upload" className="cursor-pointer block w-full h-full">
                <ProfilePicture
                  src={userProfilePicture ?? ''}
                  alt={user ? `${getUserDisplayName(user)}'s profile photo` : 'Profile photo'}
                  className="w-full h-full"
                />
                {user.userLevel !== 'FREE' && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent rounded-full px-2 py-1 w-fit z-10">
                    <p className="text-sm text-white">{user.userLevel}</p>
                  </div>
                )}
                <Input
                  id="logo-file-upload"
                  type="file"
                  onChange={(e) => {
                    onProfilePictureChange(e);
                  }}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </TooltipTrigger>
            <TooltipContent>
              <p>Change profile picture</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <ProfilePicture
          src={user?.userProfilePicture ?? ''}
          alt={`${getUserDisplayName(user)}'s profile photo`}
          className="w-full h-full"
        />
      )}
    </div>
  );
}
