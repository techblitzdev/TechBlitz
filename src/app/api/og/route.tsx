import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get text from query parameter or use default
  const text = searchParams.get('text') || 'Hello, World!';

  // Get background color from query parameter or use default
  const bgColor = searchParams.get('bgColor') || '#f0f0f0';

  // Get text color from query parameter or use default
  const textColor = searchParams.get('textColor') || '#000000';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 60,
          fontWeight: 'bold',
          background: bgColor,
          color: textColor
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
