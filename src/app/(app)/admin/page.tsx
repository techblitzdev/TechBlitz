import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import NewQuestionModal from '@/components/app/admin/questions/new-question-modal';
import NewCodingChallengeQuestionModal from '@/components/app/admin/questions/new-coding-challenge-modal';
import { addSlugFlagToQuestion, addSlugToQuestion } from '@/scripts/add-slug-to-question';
import { addUidAsUsername } from '@/scripts/add-uid-as-username';
import { addIsCustomUsernameToUser } from '@/scripts/add-is-custom-username-to-user';
import { addTitleToQuestion } from '@/scripts/add-title-to-question';
import { sendWelcomeEmail } from '@/actions/misc/send-welcome-email';
import { addUserMissions } from '@/scripts/add-user-missions';
import { addUserXp } from '@/scripts/add-user-xp';

export const metadata: Metadata = {
  title: 'TechBlitz | Admin Dashboard',
  description: 'TechBlitz Administration Dashboard',
};

export default function AdminDashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Admin Dashboard</h1>
      <p className="text-gray-300 mb-8">
        Welcome to the TechBlitz administration area. Use the cards below to navigate to different
        sections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#000000] rounded-lg shadow-sm border border-black-50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">PSEO Pages</h2>
            <p className="text-gray-400 mb-4">Create and manage PSEO pages for SEO optimization.</p>
          </div>
          <div className="bg-secondary px-6 py-3 flex justify-between">
            <Link
              href="/admin/pseo"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Create New
            </Link>
            <Link
              href="/admin/pseo/list"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="bg-[#000000] rounded-lg shadow-sm border border-black-50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Users</h2>
            <p className="text-gray-400 mb-4">Manage user accounts and view analytics.</p>
          </div>
          <div className="bg-secondary px-6 py-3 flex justify-between">
            <Link
              href="/admin/users"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/users/list"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="bg-[#000000] rounded-lg shadow-sm border border-black-50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Questions</h2>
            <p className="text-gray-400 mb-4">Manage coding questions and challenges.</p>
          </div>
          <div className="bg-secondary px-6 py-3 flex justify-between">
            <Link
              href="/admin/questions"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Manage
            </Link>
            <Link
              href="/admin/questions/list"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="bg-[#000000] rounded-lg shadow-sm border border-black-50 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2 text-white">Leagues</h2>
            <p className="text-gray-400 mb-4">Create and manage leagues.</p>
          </div>
          <div className="bg-secondary px-6 py-3 flex justify-between">
            <Link
              href="/admin/leagues"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              Create New
            </Link>
            <Link
              href="/admin/leagues/list"
              className="text-primary hover:text-primary/90 transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-white">Admin Tools</h2>
        <div className="bg-[#000000] rounded-lg shadow-sm border border-black-50 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="flex gap-4">
              <NewQuestionModal className="w-fit" />
              <NewCodingChallengeQuestionModal className="w-fit" />
            </div>
            <form action={addSlugToQuestion}>
              <Button type="submit" variant="outline" className="w-full">
                Add URL to Question
              </Button>
            </form>
            <form action={addSlugFlagToQuestion}>
              <Button type="submit" variant="outline" className="w-full">
                Add Slug Flag to Question
              </Button>
            </form>
            <form action={addUidAsUsername}>
              <Button type="submit" variant="outline" className="w-full">
                Add UID as Username
              </Button>
            </form>
            <form
              action={async () => {
                'use server';
                await addIsCustomUsernameToUser();
              }}
            >
              <Button type="submit" variant="outline" className="w-full">
                Add isCustomUsername to User
              </Button>
            </form>
            <form action={addTitleToQuestion}>
              <Button type="submit" variant="outline" className="w-full">
                Add Title to Questions
              </Button>
            </form>
            <form
              action={async () => {
                'use server';
                await sendWelcomeEmail(
                  {
                    email: 'logan@hiyield.co.uk',
                    username: 'Logan',
                  },
                  'test-coupon'
                );
              }}
            >
              <Button type="submit" variant="outline" className="w-full">
                Send Welcome Email
              </Button>
            </form>
            <form action={addUserMissions}>
              <Button type="submit" variant="outline" className="w-full">
                Add User Missions
              </Button>
            </form>
            <form action={addUserXp}>
              <Button type="submit" variant="outline" className="w-full">
                Add User XP
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
