import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useUserServer } from '@/hooks/use-user-server';

export const metadata: Metadata = {
  title: 'TechBlitz | Admin',
  description: 'TechBlitz Administration',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await useUserServer();

  if (!user) {
    redirect('/auth/login');
  }

  if (user.userLevel !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#000000]">
      <header className="border-b border-black-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            href="/admin"
            className="text-xl font-bold text-white hover:text-gray-200 transition-colors font-onest"
          >
            Hello, {user.username}
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li className="relative group">
                <Link
                  href="/admin/pseo"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  PSEO Pages
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-black-75 border border-black-50 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      href="/admin/pseo"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-black-50 hover:text-white"
                    >
                      Create New Page
                    </Link>
                    <Link
                      href="/admin/pseo/list"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-black-50 hover:text-white"
                    >
                      View All Pages
                    </Link>
                  </div>
                </div>
              </li>
              <li className="relative group">
                <Link
                  href="/admin/users"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Users
                </Link>
                <div className="absolute left-0 mt-2 w-48 bg-black-75 border border-black-50 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      href="/admin/users"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-black-50 hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/users/list"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-black-50 hover:text-white"
                    >
                      All Users
                    </Link>
                  </div>
                </div>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Back to App
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex-grow p-6">{children}</div>
    </div>
  );
}
