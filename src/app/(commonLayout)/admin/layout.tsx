"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check authentication and admin role
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      toast.info("Access for you have to login.", {
        onClose: () => {
          router.push("/login"); // Redirect to login
        },
      });
      setIsLoading(false);
    } else {
      const userRole = JSON.parse(atob(authToken.split(".")[1])).role;
      if (userRole !== "admin") {
        toast.error("Admin access only");
        router.push("/"); // Redirect to home or another appropriate page
      } else {
        setIsAdmin(true);
      }
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  if (!isAdmin) {
    return null; // Do not render anything if not an admin
  }

  return (
    <div>
      <h1>Admin Dashboard Sidebar</h1>
      {children}
    </div>
  );
}
