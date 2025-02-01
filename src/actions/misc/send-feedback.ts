"use server";
import { resend } from "@/lib/resend";
import { getUser } from "@/actions/user/authed/get-user";

export const sendFeedback = async (feedback: string) => {
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  await resend.emails.send({
    from: "TechBlitz <team@techblitz.dev>",
    to: "team@techblitz.dev",
    subject: "Feedback from " + user.email,
    text: `Feedback from ${user.email}:\n\n${feedback}`,
  });
};
