'use client';
import { Input } from '@/components/ui/input';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

export default function UploadTestPage() {
  const { user } = useUser();

  const onSubmit = async (data: any) => {
    if (!user?.uid) return;
    const formData = new FormData();
    formData.append('files', data.target.files[0]);
    formData.append('userId', user?.uid);
    formData.append('route', 'user-profile-pictures');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const { logoUrl } = await res.json();

      console.log(logoUrl);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <label
        htmlFor="logo-file-upload"
        className="bg-blue-500 p-2 rounded text-white cursor-pointer"
      >
        Upload Logo
      </label>
      <Input
        id="logo-file-upload"
        type="file"
        onChange={() => {
          onSubmit(event);
        }}
        className="!hidden"
      />
    </div>
  );
}
