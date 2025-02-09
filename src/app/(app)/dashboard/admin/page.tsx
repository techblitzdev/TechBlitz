'use client';
import { addSlugFlagToQuestion, addSlugToQuestion } from '@/scripts/add-slug-to-question';
import NewQuestionModal from '@/components/app/questions/admin/new-question-modal';
import { Button } from '@/components/ui/button';
import { addUidAsUsername } from '@/scripts/add-uid-as-username';
import { addIsCustomUsernameToUser } from '@/scripts/add-is-custom-username-to-user';
import NewCodingChallengeQuestionModal from '@/components/app/questions/admin/new-coding-challenge-modal';
import { addTitleToQuestion } from '@/scripts/add-title-to-question';
import { sendWelcomeEmail } from '@/actions/misc/send-welcome-email';
import { addUserMissions } from '@/scripts/add-user-missions';

export default function AdminPage() {
  return (
    <div className="px-6 h-screen flex flex-col gap-5 items-center justify-center">
      <div className="flex gap-4">
        <NewQuestionModal className="w-fit" />
        <NewCodingChallengeQuestionModal className="w-fit" />
      </div>
      <form action={addSlugToQuestion}>
        <Button type="submit">Add URL to Question (test)</Button>
      </form>
      <form action={addSlugFlagToQuestion}>
        <Button type="submit">Add Slug Flag to Question</Button>
      </form>
      <form action={addUidAsUsername}>
        <Button type="submit">Add UID as Username</Button>
      </form>
      <form action={addIsCustomUsernameToUser}>
        <Button type="submit">Add isCustomUsername to User</Button>
      </form>
      <form action={addTitleToQuestion}>
        <Button type="submit">Add Title to Questions</Button>
      </form>
      <form
        action={async () => {
          await sendWelcomeEmail({
            email: 'logan@hiyield.co.uk',
            username: 'Logan',
          });
        }}
      >
        <Button type="submit">Send Welcome Email</Button>
      </form>
      <form action={addUserMissions}>
        <Button type="submit">Add User Missions</Button>
      </form>
    </div>
  );
}
