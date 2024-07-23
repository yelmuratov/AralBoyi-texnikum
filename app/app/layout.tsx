import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/mode/mode";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aralboyi medicina texnikumi",
  description: "ARALBOYI MEDICINA HAM TRANSPORT TEXNIKUMI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          >
          <ToastProvider>
          <Toaster />
          <div className="relative flex flex-col gap-8 items-center justify-center min-h-screen px-4">
            <div className="absolute top-4 right-4">
              <ModeToggle />
            </div>
            <h1 className="text-lg font-bold">ARALBOYI MEDICINA HAM TRANSPORT TEXNIKUMI</h1>
            {children}
          <footer className="w-full flex flex-col items-center space-y-2 mb-4">
              <span className="text-gray-600 text-sm font-medium">
                Aralboyi medicina ham transport texnikumi
              </span>
              <a
                href="/license.pdf"  
                download
                className="text-blue-500 hover:text-blue-700 hover:underline transition duration-300 ease-in-out px-12 text-sm font-medium"
              >
                Ma'mleketlik litsenziya
              </a>
            </footer>
          </div>
        </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
