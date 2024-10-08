"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children, isAuth, isAdmin }) => {
    const router = useRouter();

    useEffect(() => {
        if (!isAuth) {
            toast.info("Access for you have to login.", {
                onClose: () => {
                    router.push('/login'); // Redirect to login
                }
            });
        } else if (!isAdmin) {
            toast.error("Admin access only");
            router.push('/'); // Redirect to home or another appropriate page
        }
    }, [isAuth, isAdmin]);

    return isAuth && (isAdmin || router.pathname !== '/admin') ? children : null;
};

export default ProtectedRoute;
