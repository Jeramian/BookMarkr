import './globals.css';
import type { Metadata } from 'next';
import NavBar from './components/NavBar';
import Banner from './components/Banner';

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
      <body>
        <Banner />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
