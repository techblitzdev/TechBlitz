import type { Config } from 'tailwindcss';
import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

const svgToDataUri = require('mini-svg-data-uri');

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const config: Config = {
  darkMode: ['class'],
  content: {
    files: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
      './node_modules/onborda/dist/**/*.{js,ts,jsx,tsx}',
    ],
    extract,
  },
  safelist: [
    {
      pattern: /bg-yellow/,
      variants: ['hover'],
    },
    {
      pattern: /text-yellow/,
      variants: ['hover'],
    },
    {
      pattern: /border-yellow/,
      variants: ['hover'],
    },
    {
      pattern: /bg-blue/,
      variants: ['hover'],
    },
    {
      pattern: /text-blue/,
      variants: ['hover'],
    },
    {
      pattern: /border-blue/,
      variants: ['hover'],
    },
  ],
  theme: {
    screens, // tailwind's default screens, in `rem`
    fontSize, // tailwind's default font sizes, in `rem` (including line heights)
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        satoshi: ['var(--font-satoshi)'],
        ubuntu: ['var(--font-ubuntu)'],
        onest: ['var(--font-onest)'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        black: {
          '25': '#212121',
          '50': '#2D2D2D',
          '75': '#0a0a0a',
          '100': '#111111',
          '200': '#0E0E0E',
          '300': '#05050A',
          '400': '#000000',
          '500': '#000000',
          '600': '#000000',
          '700': '#000000',
          '800': '#000000',
          '900': '#000000',
          '950': '#000000',
          DEFAULT: '#0E0E0E',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        scroll: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(calc(-72px * var(--question-count)))',
          },
        },
        'scroll-right': {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
        shimmer: {
          from: {
            backgroundPosition: '0 0',
          },
          to: {
            backgroundPosition: '-200% 0',
          },
        },
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - var(--gap)))',
          },
        },
        'marquee-vertical': {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(calc(-100% - var(--gap)))',
          },
        },
        'start-bounce': {
          '0%, 100%': {
            transform: 'translateY(-10%)',
          },
          '50%': {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        scroll: 'scroll 20s linear infinite',
        'scroll-right':
          'scroll-right var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        'border-spin': 'border-spin 10s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'start-bounce': 'start-bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    addVariablesForColors,
    addMatchUtils,
    require('tailwind-container-break-out'),
    fluid,
  ],
};

function addMatchUtils({ matchUtilities, theme }: any) {
  matchUtilities(
    {
      'bg-grid': (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      'bg-grid-small': (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
        )}")`,
      }),
      'bg-dot': (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
        )}")`,
      }),
      'bg-dot-thick': (value: any) => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
  );
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  // Custom accent utilities
  const customUtilities = {
    '.stroke-accent': {
      stroke: 'hsl(var(--accent))',
    },
    '.fill-accent': {
      fill: 'hsl(var(--accent))',
    },
    '.bg-accent': {
      backgroundColor: 'hsl(var(--accent))',
    },
    '.text-accent': {
      color: 'hsl(var(--accent))',
    },
  };

  addBase({
    ':root': newVars,
    ...customUtilities,
  });
}

export default config;
