import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Care Tips & Story",
  description: "Pet Care Tips & Story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
        Footer
      </body>
    </html>
  );
}
