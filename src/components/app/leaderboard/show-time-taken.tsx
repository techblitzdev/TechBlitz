'use client';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { updateUser } from '@/actions/user/authed/update-user';
import { useState } from 'react';
import { toast } from 'sonner';
import { UserRecord } from '@/types/User';

export default function ShowTimeTakenToggle(opts: {
  user?: UserRecord | null;
}) {
  const [checked, setChecked] = useState(opts.user?.showTimeTaken ?? true);

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
        disabled={!opts.user}
      />
      <Label htmlFor="showTimeTaken" className="text-white">
        {checked ? 'Hide' : 'Show'} on leaderboard?
      </Label>
    </form>
  );
}
