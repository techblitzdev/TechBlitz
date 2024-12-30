import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Get text from query parameter or use default
    const text = searchParams.get('text') || 'TechBlitz';
    const bgColor = searchParams.get('bgColor') || '#000000';
    const textColor = searchParams.get('textColor') || '#ffffff';

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
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                fontSize: 60,
                fontWeight: 'bold',
                letterSpacing: '-0.025em',
                color: textColor,
                marginBottom: 12,
                lineHeight: 1.2,
                whiteSpace: 'pre-wrap',
                textAlign: 'center',
                padding: '0 48px',
              }}
            >
              {text}
            </div>
            <div
              style={{
                fontSize: 24,
                color: textColor,
                opacity: 0.8,
                textAlign: 'center',
                marginTop: 12,
              }}
            >
              The open-source, mobile-friendly software education platform
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Using system fonts instead of loading external fonts
        // This is more reliable for OG image generation
        fonts: undefined,
        headers: {
          'Cache-Control': 'public, max-age=3600',
          'Content-Type': 'image/png',
        },
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
