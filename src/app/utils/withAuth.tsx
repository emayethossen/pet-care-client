"use client"
import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, isAdmin: boolean = false) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const authToken = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    useEffect(() => {
      if (!authToken) {
        toast.info("Access for you have to login.", {
          onClose: () => {
            router.push("/login"); // Redirect to login
          },
        });
      } else if (isAdmin) {
        const userRole = JSON.parse(atob(authToken.split(".")[1])).role;
        if (userRole !== "admin") {
          toast.error("Admin access only");
          router.push("/"); // Redirect to home or another appropriate page
        }
      }
    }, [authToken, isAdmin, router]);

    if (!authToken || (isAdmin && JSON.parse(atob(authToken.split(".")[1])).role !== "admin")) {
      return null; // Do not render anything if not authenticated or not an admin
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
