import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // fetch the Ubuntu font from Google Fonts
  const ubuntuFont = await fetch(
    new URL(
      'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap',
      request.url
    )
  ).then((res) => res.arrayBuffer());

  // get text from query parameter or use default
  const text = searchParams.get('text') || 'Hello, World!';

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
          fontFamily: 'Ubuntu',
        }}
      >
        <div style={{ marginTop: 40, color: textColor }}>{text}</div>
        <p style={{ color: textColor, fontSize: '14px', fontWeight: '400' }}>
          The open-source, mobile-friendly software education platform
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Ubuntu',
          data: ubuntuFont,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
