import { Inter } from "next/font/google";
import "./globals.css";

// This pulls in the clean sans-serif font and sets it as the default variable
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata = {
  title: "Persona Architect",
  description: "Strict, data-driven persona generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Global Watermark */}
        <div className="fixed bottom-3 right-4 text-[11px] text-slate-400/80 font-medium tracking-wide z-50 pointer-events-none">
          Built by RRR for Axis Design Lab
        </div>
      </body>
    </html>
  );
}