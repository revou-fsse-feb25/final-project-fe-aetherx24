import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luminark - Digital Learning Platform",
  description: "Develop your digital and technology skills with our comprehensive and interactive online learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
