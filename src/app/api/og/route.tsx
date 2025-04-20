import LogoSmall from '@/components/ui/LogoSmall';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Load fonts - using Onest as specified in the original code
  const onestRegular = await fetch(
    new URL('../../styles/fonts/onest/Onest-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const onestMedium = await fetch(
    new URL('../../styles/fonts/onest/Onest-Medium.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  // Get parameters from URL with defaults
  const title = searchParams.get('title') || 'TechBlitz';
  const subtitle =
    searchParams.get('subtitle') || 'Learning to code made free and accessible to everyone.';
  const theme = searchParams.get('theme') || 'dark';

  // Select background based on theme - always black now
  const background = '#000000';

  // Text color based on theme
  const textColor = theme === 'light' ? '#0f172a' : '#ffffff';
  const accentColor = theme === 'gradient' ? '#ffffff' : theme === 'dark' ? '#3b82f6' : '#3b82f6';

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
          background,
          position: 'relative',
          fontFamily: '"Onest"',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(40px)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-150px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.08)',
            filter: 'blur(60px)',
          }}
        />

        {/* Grid pattern overlay */}
        <svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.2,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M.5 40V.5H40"
                fill="none"
                stroke={textColor}
                strokeOpacity="0.2"
                strokeDasharray="4 2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Content container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '900px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '16px',
              background: accentColor,
              marginBottom: '12px',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <LogoSmall size={120} className="w-full h-full" />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '64px',
              fontWeight: '500',
              color: textColor,
              margin: '0 0 16px 0',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontFamily: '"Onest"',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '20px',
              color: textColor,
              opacity: 0.8,
              margin: '0',
              maxWidth: '700px',
              fontFamily: '"Onest"',
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 40px',
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <p
            style={{
              fontSize: '16px',
              color: textColor,
              opacity: 0.7,
              margin: '0',
              fontFamily: '"Onest"',
            }}
          >
            techblitz.dev
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Onest',
          data: onestMedium,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'Onest',
          data: onestRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
