"use client";

import React, { useState } from "react";
import Link from "next/link";
import { postLogout } from "@/lib/gen";
import { useRouter } from "next/navigation";

const Navbar = ({ userEmail = "user@example.com" }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const logout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await postLogout();
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Weather forecast
            </Link>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center relative">
            <span className="hidden md:block mr-4 text-gray-600">
              {userEmail}
            </span>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col justify-center items-center p-2 rounded-full hover:bg-gray-100 focus:outline-none w-10 h-10 relative"
            >
              <span
                className={`bg-gray-600 h-0.5 w-5 rounded-full transition-all duration-300 absolute ${isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`}
              />
              <span
                className={`bg-gray-600 h-0.5 w-5 rounded-full transition-all duration-300 absolute ${isOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`bg-gray-600 h-0.5 w-5 rounded-full transition-all duration-300 absolute ${isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}`}
              />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  {/* Mobile only - show email */}
                  <div className="md:hidden px-4 py-2 text-sm text-gray-600 border-b">
                    {userEmail}
                  </div>

                  <Link
                    href="/change-email"
                    onClick={(_) => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Change Email
                  </Link>

                  <Link
                    href="/change-password"
                    onClick={(_) => setIsOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Change Password
                  </Link>

                  <Link
                    onClick={logout}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
