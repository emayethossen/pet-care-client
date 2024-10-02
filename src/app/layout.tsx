import type { Metadata } from "next";
import "./globals.css";
import Providers from "./lib/Provider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
        <Providers>
          <div className="">{children}</div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
