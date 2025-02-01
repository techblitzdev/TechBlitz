"use server";

import { getUser } from "@/actions/user/authed/get-user";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const deleteReport = async (reportUid: string) => {
  // ensure that the user is authed, and is the owner of the report
  // before they can delete it
  const user = await getUser();
  if (!user) throw new Error("User not found");

  await prisma.statisticsReport.delete({
    where: {
      uid: reportUid,
      userUid: user.uid,
    },
  });

  revalidateTag("reports");

  return "ok";
};
