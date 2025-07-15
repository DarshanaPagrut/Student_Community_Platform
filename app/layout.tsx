import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/src/components/providers/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';


export const metadata: Metadata = {
  title: 'Students Platform',
  description: 'A platform for students to learn and compete',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <AuthProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          {children}
        </ThemeProvider>
          </AuthProvider>
      </body>
    </html>
  );
}