import { getStudyPath } from '@/utils/data/study-paths/get';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const studyPath = await getStudyPath(params.slug);

    if (!studyPath) {
      return NextResponse.json({ error: 'Study path not found' }, { status: 404 });
    }

    return NextResponse.json(studyPath);
  } catch (error) {
    console.error('Error fetching study path:', error);
    return NextResponse.json({ error: 'Failed to fetch study path' }, { status: 500 });
  }
}
