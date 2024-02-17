"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { navLinks } from "@/constant";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <Link href={"/"} className="flex items-center gap-2 md:py-2">
        <Image
          src={"/assets/images/logo-text.svg"}
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      {/* Navigation bar */}
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Image
                src={"/assets/icons/menu.svg"}
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer object-contain"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src={"/assets/images/logo-text.svg"}
                  alt="logo"
                  width={152}
                  height={23}
                />

                {/* Render Links */}
                <ul className="header-nav_elements">
                  {navLinks.map((navLink, index) => {
                    const isActive = navLink.route === pathname;
                    return (
                      <li
                        key={index}
                        className={`p-18 flex whitespace-nowrap text-dark-700 hover:text-dark-700/70 ${
                          isActive && "gradient-text"
                        }`}
                      >
                        <Link
                          className="sidebar-link cursor-pointer"
                          href={navLink.route}
                        >
                          <Image
                            src={navLink.icon}
                            alt={navLink.label}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                          {navLink.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>

        {/* Once Signed Out */}
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href={"/sign-in"}>Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
