"use client";

import { ActiveLink } from "./activeLink/ActiveLink";
import Image from "next/image";
import { UserButton } from "./UserButton";

const navItems = [
  { path: "/", text: "Home" },
  { path: "/reviews", text: "Reseñas" },
  { path: "/map", text: "Mapa" },
  { path: "/recipe", text: "Recetario" },
];

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav
        className="
          mx-2 mt-2 rounded-xl
          bg-[#FAF9F6]/90 backdrop-blur
          border border-[#F5EDE4]
          shadow-sm
        "
      >
        <div className="mx-auto max-w-6xl px-3 py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo de Mesa para Dos"
              width={40}
              height={40}
              priority
              className="rounded-lg"
            />
          </div>

          {/* Links */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <ActiveLink key={item.path} {...item} />
            ))}
          </div>

          {/* Usuario */}
          <UserButton />
        </div>
      </nav>
    </header>
  );
};
