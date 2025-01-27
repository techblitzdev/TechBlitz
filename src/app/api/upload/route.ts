import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import uniqid from 'uniqid';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Remember to enforce type here and after use some lib like zod.js to check it
  const files = formData.getAll('files') as File[];
  const userId = formData.get('userId') as string;
  // check if the user exists
  const user = await prisma.users.findUnique({
    where: {
      uid: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const route = formData.get('route') as string;

  // Validate required fields
  if (!files.length || !userId || !route) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Validate file
  const file = files[0];

  // Check file size (5MB limit)
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: 'File size too large. Maximum size is 5MB' },
      { status: 400 }
    );
  }

  // Check file type
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { message: 'Invalid file type. Only PNG and JPEG images are allowed' },
      { status: 400 }
    );
  }

  const fileLocation = `${userId}/logo.png`;

  // Upload the files to the storage
  // The file will be stored in the user-profile-pictures bucket with the key `userId/logo`
  // upsert set to true so the user can replace the logo if they want to
  const { error } = await supabase.storage
    .from(route)
    .upload(fileLocation, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    });

  // Update the database with the new logo
  if (error && error instanceof Error) {
    return NextResponse.json({ message: error.message });
  }

  // get the public url for the newly uploaded file
  const { data: url } = await supabase.storage
    .from(route)
    .getPublicUrl(fileLocation);

  // append a unique id to the url to refetch the image every time we upload it
  // this is to prevent the browser from caching the image
  return NextResponse.json({
    message: 'Files Created',
    logoUrl: `${url.publicUrl}?u=${uniqid()}`,
  });
}
