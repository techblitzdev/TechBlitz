import { getUser } from '@/actions/user/authed/get-user';
import { prisma } from '@/lib/prisma';

export const getOrCreateUserProfile = async () => {
  const user = await getUser();

  // if no user, return null
  if (!user) {
    return null;
  }

  // get the user's profile
  const profile = await prisma.profile.findUnique({
    where: { userUid: user?.uid },
    include: {
      user: true,
    },
  });

  // if the user exists in our database, but does not have a profile, create one
  if (!profile) {
    console.log('creating profile');
    const newProfile = await prisma.profile.create({
      data: {
        userUid: user?.uid,
        handle: user?.username || user?.uid,
      },
      include: {
        user: true,
      },
    });
    return newProfile;
  }

  return profile;
};

/**
 * getting the a users profile by their username
 *
 * @param username
 * @returns
 */
export const getUserProfileByUsername = async (username: string) => {
  const user = await prisma.users.findFirst({
    where: { username },
    include: {
      Profile: true,
    },
  });

  if (!user) {
    return {
      user: null,
      profile: null,
    };
  }

  // remove the profile from the user object
  const { Profile, ...userWithoutProfile } = user;

  return {
    user: userWithoutProfile,
    profile: Profile,
  };
};
