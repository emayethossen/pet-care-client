import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AuthRoutes = ["/login", "/register"]

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
    user: [/^\/profile/],
    admin: [/^\/admin/],
}
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;
    console.log(pathname)

    // const user = undefined
    const user = {
        name: "Riad",
        token: "djfcvnkdnv",
        role: "user"
    }

    if (!user) {
        if (AuthRoutes.includes(pathname)) {
            return NextResponse.next()
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (user?.role && roleBasedRoutes[user?.role as Role]) {
        const routes = roleBasedRoutes[user?.role as Role];

        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next()
        }
    }

    return NextResponse.redirect(new URL('/', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/profile", "/login", "/register"],
    // matcher: '/about/:path*',
}