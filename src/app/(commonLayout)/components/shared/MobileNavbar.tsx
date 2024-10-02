
<div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#FEF2F2]"
        >
            Home
        </Link>
        {/* here user role set */}
        <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#FEF2F2]"
        >
            About
        </Link>
        <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#FEF2F2]"
        >
            Contact
        </Link>
        {user ? (
            <button
                onClick={handleLogout}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#FEF2F2]"
            >
                Logout
            </button>
        ) : (
            <>
                <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#FEF2F2]"
                >
                    Login
                </Link>
                <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#FEF2F2]"
                >
                    Sign Up
                </Link>
            </>
        )}
    </div>
</div>
