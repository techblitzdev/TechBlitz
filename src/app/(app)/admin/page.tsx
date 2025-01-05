'use client';
import NewQuestionModal from '@/components/app/questions/new-question-modal';
import { Button } from '@/components/ui/button';
import { sendLiveEmail } from '@/actions/waitlist/send-live-email';

export default function AdminPage() {
  return (
    <div className="px-6 h-screen flex items-center justify-center">
      <NewQuestionModal className="w-fit" />
      <Button onClick={() => sendLiveEmail()}>Send Live Email</Button>
    </div>
  );
}
