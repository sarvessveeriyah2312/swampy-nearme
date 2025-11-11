import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';
import { AnalyticsTracker } from '@/components/AnalyticsTracker'; // 👈 create this below

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Swamiye NearMe - Discover Ayyappa Poojas Around You',
  description: 'Find, share and join nearby Ayyappa Poojas and Bhajans in your community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Script */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>

      <body className={`${poppins.className} bg-amber-50/20`}>
        {/* ✅ Auto page view tracker */}
        {GA_ID && <AnalyticsTracker />}

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <Toaster />
      </body>
    </html>
  );
}
