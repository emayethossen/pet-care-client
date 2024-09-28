import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Care Tips & Story",
  description: "Pet Care Tips & Story",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div>
            Admin Dashboard Sidebar
            {children}
        </div>
  );
}
