import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Poets4Life Genesis Studio — AI Spoken-Word & TikTok Automation',
  description:
    'Transform spoken-word poetry into viral 9:16 vertical videos and automate studio-grade TikTok publishing. Trusted by modern creators.',
  openGraph: {
    type: 'website',
    url: 'https://www.poets4life.com/',
    title: 'Poets4Life Genesis Studio — AI Spoken-Word & TikTok Automation',
    description:
      'Transform spoken-word poetry into viral 9:16 vertical videos and automate studio-grade TikTok publishing. Trusted by modern creators.',
    siteName: 'Poets4Life',
    images: [
      {
        url: '/p4l_logo_s.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Poets4Life Genesis Studio — AI Spoken-Word & TikTok Automation',
    description:
      'Transform spoken-word poetry into viral 9:16 vertical videos and automate studio-grade TikTok publishing. Trusted by modern creators.',
    images: ['/p4l_logo_s.jpg'],
  },
  icons: {
    icon: [{ type: 'image/png', url: '/p4l_logo_s.jpg' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.poets4life.com/" />
        <link rel="icon" type="image/png" href="/p4l_logo_s.jpg" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600&family=Oswald:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col items-center py-16 px-4">
        {children}
      </body>
    </html>
  )
}