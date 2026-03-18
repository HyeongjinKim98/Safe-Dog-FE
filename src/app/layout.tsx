import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "sonner";
export const viewport: Viewport = {
  themeColor: "#e1ccff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "safedog",
  description: "safe dog project",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "safedog",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
          <main className="flex min-h-screen w-full max-w-xl flex-col items-center bg-white dark:bg-black sm:items-start">
            {children}
            <Toaster />
          </main>
        </div>
      </body>
    </html>
  );
}
