import { getUser } from "@/actions/user/authed/get-user";
import { prisma } from "@/lib/prisma";

export const getOrCreateUserProfile = async () => {
  const user = await getUser();

  // if no user, return null
  if (!user) {
    return null;
  }

  try {
    // get the user's profile
    const profile = await prisma.profile.findUnique({
      where: {
        userUid: user.uid,
      },
      include: {
        user: true,
      },
    });

    // if profile exists, return it
    if (profile) {
      return profile;
    }

    // if the user exists in our database, but does not have a profile, create one
    console.log("creating profile");
    const newProfile = await prisma.profile.create({
      data: {
        userUid: user.uid,
        handle: user.username || user.uid,
      },
      include: {
        user: true,
      },
    });
    return newProfile;
  } catch (error: any) {
    // If we get a unique constraint error, it means the profile was created
    // in a race condition between our check and create. Try to fetch it again.
    if (error.code === "P2002" && error.meta?.target?.includes("userUid")) {
      const existingProfile = await prisma.profile.findUnique({
        where: {
          userUid: user.uid,
        },
        include: {
          user: true,
        },
      });
      return existingProfile;
    }
    throw error;
  }
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
