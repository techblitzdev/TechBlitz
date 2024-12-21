import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
  return NextResponse.json({ message: 'Hello, World!' });
}
