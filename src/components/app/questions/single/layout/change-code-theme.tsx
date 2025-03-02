'use client';

import EditorIcon from '@/components/ui/icons/editor';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectItem, SelectTrigger, SelectContent } from '@/components/ui/select';
import { UserRecord } from '@/types/User';

import { useState } from 'react';
import { themes } from 'prism-react-renderer';
import { useEffect } from 'react';
import { updateUser } from '@/actions/user/authed/update-user';

export default function ChangeCodeTheme({ user }: { user: UserRecord | null }) {
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>(
    'vs-dark' as keyof typeof themes
  );

  useEffect(() => {
    setSelectedTheme(user?.codeEditorTheme as keyof typeof themes);
  }, [user]);

  const handleThemeChange = async (theme: keyof typeof themes) => {
    console.log('theme', theme);
    setSelectedTheme(theme);
    await updateUser({ userDetails: { codeEditorTheme: theme } });
  };

  return (
    <Popover>
      <PopoverTrigger className="text-gray-400">
        <EditorIcon />
      </PopoverTrigger>
      <PopoverContent
        className="bg-black-100 text-white border border-black-50 flex flex-col gap-y-2"
        align="end"
      >
        <h5 className="text-lg font-semibold mb-2">Code Theme</h5>
        <Select onValueChange={handleThemeChange} value={selectedTheme}>
          <SelectTrigger className="border border-black-50 w-full">{selectedTheme}</SelectTrigger>
          <SelectContent>
            {Object.entries(themes).map(([key]) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
}
