import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'techblitz app',
    short_name: 'techblitz',
    description: '',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    lang: 'en',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/png',
      },
    ],
  }
}
