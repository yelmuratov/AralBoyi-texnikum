import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/mode/mode";

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
          <div className="relative flex flex-col gap-8 items-center justify-center min-h-screen px-4">
            <div className="absolute top-4 right-4">
              <ModeToggle />
            </div>
            <h1 className="text-lg font-bold">ARALBOYI MEDICINA HAM TRANSPORT TEXNIKUMI</h1>
            {children}
            <footer className="absolute bottom-4 w-full flex flex-col items-center space-y-2">
              <span className="text-gray-600 text-sm font-medium">
                Aralboyi medicina ham transport texnikumi
              </span>
              <a
                href="/pdf/myfile.pdf"  
                download
                className="text-blue-500 hover:text-blue-700 hover:underline transition duration-300 ease-in-out px-12 text-sm font-medium"
              >
                Ma'mleketlik litsenziya
              </a>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
