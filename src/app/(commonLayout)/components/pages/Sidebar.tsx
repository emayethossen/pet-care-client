"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const [user, setUser] = useState<any>(null);
    const pathname = usePathname(); 
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
        router.push("/login");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user"); 
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getLinkClassName = (path: string) => {
        const baseClass = 'block px-4 py-2 rounded';
        const activeClass = 'text-white bg-gray-800';  // Active link style
        const inactiveClass = 'text-gray-700 hover:bg-gray-200';  // Inactive link style
        return pathname === path ? `${baseClass} ${activeClass}` : `${baseClass} ${inactiveClass}`;
    };

    return (
        <div className="w-64 h-screen bg-[#E0F7FA]">
            <nav className="mt-4 px-12 py-4 font-bold">
                <Link href="/admin" className={getLinkClassName('/admin')}>
                    Dashboard
                </Link>
                <Link href="/admin/profile" className={getLinkClassName('/admin/profile')}>
                    Profile
                </Link>
                <Link href="/admin/users" className={getLinkClassName('/admin/users')}>
                    Users
                </Link>
                <Link href="/admin/content" className={getLinkClassName('/admin/content')}>
                    Content
                </Link>
                <Link href="/admin/payment" className={getLinkClassName('/admin/payment')}>
                    Payment
                </Link>
                <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
