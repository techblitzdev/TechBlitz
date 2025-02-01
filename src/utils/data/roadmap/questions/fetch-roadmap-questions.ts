import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";

export const fetchRoadmapQuestions = async (opts: {
  roadmapUid: string;
  userUid: string;
}) => {
  revalidateTag("roadmap-list");

  return await prisma.roadmapUserQuestions.findMany({
    where: {
      roadmapUid: opts.roadmapUid,
    },
    include: {
      answers: true,
    },
  });
};
