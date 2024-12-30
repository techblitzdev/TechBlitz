import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Get text from query parameter or use default
  const text = searchParams.get('text') || 'Hello, World!';

  // Get background color from query parameter or use default
  const bgColor = searchParams.get('bgColor') || '#000000';

  // Get text color from query parameter or use default
  const textColor = searchParams.get('textColor') || '#ffffff';

  return new ImageResponse(
    (
      <div
        tw={`flex items-center justify-center w-full h-full`}
        style={{
          background: bgColor,
        }}
      >
        <div tw="flex flex-col items-center justify-center">
          <h1 tw={`text-6xl font-bold`} style={{ color: textColor }}>
            {text}
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
