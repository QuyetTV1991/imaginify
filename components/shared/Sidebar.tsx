"use client";

import { navLinks } from "@/constant";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>

        {/* Render Links */}
        <nav className="sidebar-nav">
          {/* Once Signed In */}
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((navLink, index) => {
                const isActive = navLink.route === pathname;
                return (
                  <li
                    key={index}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={navLink.route}>
                      <Image
                        src={navLink.icon}
                        alt={navLink.label}
                        width={24}
                        height={24}
                        className={`object-contain ${
                          isActive && "brightness-200"
                        }`}
                      />
                      {navLink.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="sidebar-nav_elements">
              {navLinks.slice(6).map((navLink, index) => {
                const isActive = navLink.route === pathname;
                return (
                  <li
                    key={index}
                    className={`sidebar-nav_element group ${
                      isActive
                        ? "bg-purple-gradient text-white"
                        : "text-gray-700"
                    }`}
                  >
                    <Link className="sidebar-link" href={navLink.route}>
                      <Image
                        src={navLink.icon}
                        alt={navLink.label}
                        width={24}
                        height={24}
                        className={`object-contain ${
                          isActive && "brightness-200"
                        }`}
                      />
                      {navLink.label}
                    </Link>
                  </li>
                );
              })}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>
          {/* Once Signed Out */}
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
