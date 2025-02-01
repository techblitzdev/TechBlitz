"use server";

import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { getUser } from "./get-user";
import { UserRecord } from "@/types/User";

export const updateUser = async (opts: {
  userDetails: Partial<UserRecord>;
}) => {
  console.log("updateUser", opts);

  const { userDetails } = opts;

  if (!userDetails) {
    throw new Error("User data is required");
  }

  // Get the user details from the session
  const user = await getUser();

  // Ensure we have a valid user ID
  if (!user?.uid) {
    throw new Error("No user found in session");
  }

  // Clean up the userDetails to remove any undefined or null values
  const cleanedUserDetails = Object.fromEntries(
    Object.entries(userDetails).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, v]) =>
        v !== undefined &&
        v !== null &&
        !["studyPathEnrollments", "studyPathGoals"].includes(_),
    ),
  );

  // Ensure codeEditorTheme is included if provided
  if (userDetails.codeEditorTheme !== undefined) {
    cleanedUserDetails.codeEditorTheme = userDetails.codeEditorTheme;
  }

  // Handle studyPathEnrollments separately if provided
  const updateData: any = {
    ...cleanedUserDetails,
  };

  if (userDetails.studyPathEnrollments !== undefined) {
    updateData.studyPathEnrollments = {
      updateMany: userDetails.studyPathEnrollments?.map((enrollment: any) => ({
        where: { uid: enrollment.uid },
        data: {
          progress: enrollment.progress,
          completedAt: enrollment.completedAt,
          updatedAt: new Date(),
        },
      })),
    };
  }

  if (userDetails.studyPathGoals !== undefined) {
    updateData.studyPathGoals = {
      set: userDetails.studyPathGoals,
    };
  }

  // if the user is updated their username, set the isCustomUsername flag to true
  if (userDetails.username !== undefined) {
    updateData.isCustomUsername = true;
  }

  // Update the user in the database
  const updatedUser = await prisma.users.update({
    where: {
      uid: user.uid,
    },
    data: updateData,
  });

  // Revalidate the user details cache
  revalidateTag("user-details");

  return updatedUser;
};
