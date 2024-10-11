"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Sidebar from "../components/pages/Sidebar";

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
          router.push("/login");
        },
      });
      setIsLoading(false);
    } else {
      const userRole = JSON.parse(atob(authToken.split(".")[1])).role;
      if (userRole !== "admin") {
        toast.error("Admin access only");
        router.push("/");
      } else {
        setIsAdmin(true);
      }
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="flex">
        <div className="hidden h-full md:flex">
          <Sidebar />
        </div>
        <div className="flex w-full justify-center px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
