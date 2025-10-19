import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA: Your AI Balance Agent',
  description: 'AI-powered task scheduling for optimal balance and productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
