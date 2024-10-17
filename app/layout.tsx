import './globals.css';
import type { Metadata } from 'next';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import { Analytics } from "@vercel/analytics/react";
import Footer from './components/footer';

export const metadata: Metadata = {
  title: 'BookMarkr',
  description: 'Book tracking',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Banner />
        <NavBar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
