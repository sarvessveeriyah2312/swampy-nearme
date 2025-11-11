import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin']
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
  return (
    <html lang="en">
      <body className={poppins.className}>
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
