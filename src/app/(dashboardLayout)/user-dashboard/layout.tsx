import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pet Care Tips & Story",
  description: "Pet Care Tips & Story",
};

export default function UserDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div>
            User Dashboard Sidebar
            {children}
        </div>
  );
}
