import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Care Tips & Story",
  description: "Pet Care Tips & Story",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div>
            Dashboard Navbar
            {children}
        </div>
  );
}
