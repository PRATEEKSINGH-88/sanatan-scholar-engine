import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'सनातन ज्ञान-कोष एवं वैश्विक विज्ञान रिसर्च इंजन | Sanatan Scholar Engine',
  description: 'सनातन वैदिक ज्ञान, उपनिषद्, दर्शन एवं आधुनिक वैश्विक विज्ञान (क्वांटम भौतिकी, कॉस्मोलॉजी, गणित, धातुविज्ञान) का शोध इंजन।',
  keywords: [
    'Sanatan Scholar Engine',
    'Vedic Science',
    'Rigveda Cosmology',
    'Upanishads',
    'Kanad Vaisheshika',
    'Nikola Tesla Akasha Prana',
    'Erwin Schrodinger Vedanta',
    'Carl Sagan Kalpas',
    'CERN Nataraja',
    'Panini AI Sanskrit NASA',
    'Ramanujan Mock Theta Functions',
    'JC Bose Biophysics',
    'Ancient Indian Metallurgy',
    'Pingala Binary Mathematics'
  ],
  authors: [{ name: 'Sanatan Scholar Engine Research Collective' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7c1a1a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[#080402] text-[#f3ede2] selection:bg-[#a33b12] selection:text-[#fef8ec] antialiased">
        {children}
      </body>
    </html>
  );
}
