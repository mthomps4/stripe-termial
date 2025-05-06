"use client";

import Link from "next/link";
import Image from "next/image";
import { useCurrentUser } from "../contexts/CurrentUserProvider";
import { USER_KEY } from "@/constants";
import { AUTH_TOKEN_KEY } from "@/constants";

export default function Nav() {
  const { user, setUser, setToken } = useCurrentUser();

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <nav className="fixed w-full bg-neutral-100 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <Link href="/">
            <Image
              src="/sweet_cuts.png"
              alt="Sweet Cuts"
              width={80}
              height={80}
              className="rounded-full border-4 border-neutral-900 hover:border-navy-400 transition-colors"
            />
          </Link>

          <div className="flex space-x-4">
            {user ? (
              <>
                {/* Admin Navigation */}
                {user.is_admin && (
                  <div className="flex items-center space-x-4">
                    {/* Add admin-specific navigation items here */}
                    <p>Products</p>
                    <p>Merchants</p>
                    <p>Dashboards</p>
                  </div>
                )}

                {/* Merchant Navigation */}
                {user.is_merchant && (
                  <div className="flex items-center space-x-4">
                    {/* Add merchant-specific navigation items here */}
                    <p>Account Overview</p>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 btn-primary rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2">
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 btn-primary rounded-md"
                >
                  Start Your Journey
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
