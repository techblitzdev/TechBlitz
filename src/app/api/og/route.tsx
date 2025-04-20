import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // go grab the fonts we need
  const onest = await fetch(
    new URL('../../styles/fonts/onest/Onest-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  // get text from query parameter or use default
  const text = searchParams.get('text') || 'Testing';

  // get background color from query parameter or use default
  const bgColor = searchParams.get('bgColor') || '#000000';

  // get text color from query parameter or use default
  const textColor = searchParams.get('textColor') || '#ffffff';

  // generate and return the OG image
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: bgColor,
          fontSize: 32,
          fontWeight: 600,
          position: 'relative',
          fontFamily: '"Onest"',
        }}
      >
        <h1
          style={{
            marginTop: 40,
            color: textColor,
            fontSize: '4.5rem',
            fontWeight: 500,
            fontFamily: '"Onest"',
          }}
        >
          {text}
        </h1>
        <p
          style={{
            color: textColor,
            fontSize: '14px',
            fontWeight: '400',
            fontFamily: '"Onest"',
          }}
        >
          The open-source, mobile-friendly software education platform
        </p>
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            width: '100%',
            fill: 'rgba(156, 163, 175, 0.3)',
            stroke: 'rgba(156, 163, 175, 0.3)',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse" x="-1" y="-1">
              <path d="M.5 50V.5H50" fill="none" strokeDasharray="4 2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#grid)" />
        </svg>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Onest',
          data: onest,
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}
