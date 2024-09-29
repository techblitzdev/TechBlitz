import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import uniqid from 'uniqid';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Remember to enforce type here and after use some lib like zod.js to check it
  const files = formData.getAll('files') as File[];
  const userId = formData.get('userId') as string;

  const fileLocation = `${userId}/logo.png`;

  // Upload the files to the storage
  // The file will be stored in the user-profile-pictures bucket with the key `userId/logo`
  // upsert set to true so the user can replace the logo if they want to
  const { error } = await supabase.storage
    .from('user-profile-pictures')
    .upload(fileLocation, files[0], {
      cacheControl: '3600',
      upsert: true,
      contentType: 'image/png',
    });

  // Update the database with the new logo
  if (error && error instanceof Error) {
    return NextResponse.json({ message: error.message });
  }

  // get the public url for the newly uploaded file
  const { data: url } = await supabase.storage
    .from('user-profile-pictures')
    .getPublicUrl(fileLocation);

  // append a unique id to the url to refetch the image every time we upload it
  // this is to prevent the browser from caching the image
  return NextResponse.json({
    message: 'Files Created',
    logoUrl: `${url.publicUrl}?u=${uniqid()}`,
  });
}
