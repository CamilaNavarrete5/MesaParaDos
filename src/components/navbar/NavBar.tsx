"use client";

import { ActiveLink } from "./activeLink/ActiveLink";
import { UserButton } from "./UserButton";
import { PiForkKnifeLight } from "react-icons/pi";
import Link from "next/link";

const navItems = [
  { path: "/", text: "Home" },
  { path: "/reviews", text: "Reseñas" },
  { path: "/recipe", text: "Recetario" },
  { path: "/favorites", text: "Favoritos" },
  { path: "/map", text: "Mapa" },
];

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-[60]">
      <nav
        className="
          mx-1 mt-1 rounded-xl
          bg-[#A3B18A]/80 backdrop-blur
          border border-[#F5EDE4]
          shadow-sm
        "
      >
        <div className="relative w-full px-3 py-2 flex items-center justify-between">


          {/* LOGO*/}
          <div className="flex items-center gap-2 ml-20">
            <Link href="/" className="flex items-center gap-2">
              <PiForkKnifeLight size={50} className="text-[#2F2A26]" />
              <span className="text-3xl font-semibold text-[#2F2A26]">
                Mesa para Dos
              </span>
            </Link>
          </div>

          {/* LINKS */}
          <div
            className="
              hidden sm:flex gap-6
              absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
              pointer-events-none" >
            <div className="flex gap-6 pointer-events-auto">
              {navItems.map((item) => (
                <ActiveLink key={item.path} {...item} />
              ))}
            </div>
          </div>

          {/* USUARIO */}
          <div className="flex items-center justify-end">
            <UserButton />
          </div>
        </div>
      </nav>
    </header>
  );
};