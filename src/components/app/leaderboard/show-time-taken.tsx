'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { updateUser } from '@/actions/user/authed/update-user';
import { use, useState } from 'react';
import { toast } from 'sonner';
import type { UserRecord } from '@/types';

export default function ShowTimeTakenToggle(opts: { userPromise: Promise<UserRecord | null> }) {
  const { userPromise } = opts;

  const user = use(userPromise);

  const [checked, setChecked] = useState(user?.showTimeTaken ?? true);

  const handleSubmit = async (formData: FormData) => {
    const showTimeTaken = formData.get('showTimeTaken') === 'on';
    try {
      await updateUser({
        userDetails: {
          showTimeTaken,
        },
      });
      toast.success('User updated');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  return (
    <form
      className="flex flex-row md:flex-col items-center md:items-end gap-2"
      action={handleSubmit}
    >
      <Switch
        id="showTimeTaken"
        checked={checked}
        onCheckedChange={(value) => {
          setChecked(value);
          // Submit the form when switch changes
          const formData = new FormData();
          formData.set('showTimeTaken', value ? 'on' : 'off');
          handleSubmit(formData);
        }}
        className="bg-black-50"
        disabled={!user}
      />
      <Label htmlFor="showTimeTaken" className="text-white">
        {checked ? 'Hide' : 'Show'} on leaderboard?
      </Label>
    </form>
  );
}
