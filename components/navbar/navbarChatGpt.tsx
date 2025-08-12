
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { path: "/", text: "Home" },
  { path: "/review", text: "Reseñas" },
  { path: "/map", text: "Mapa" },
  { path: "/recipe", text: "Recetario" },
];

export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Link con estado "activo"
  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

    const base =
      "px-4 py-2 rounded transition-colors hover:bg-gray-800 hover:text-white";
    const active = "text-white bg-gray-800";
    const inactive = "text-gray-300";

    return (
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`${base} ${isActive ? active : inactive}`}
        onClick={() => setOpen(false)} // cierra el menú en mobile al clickear
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="relative w-full bg-gray-900 text-sm">
      {/* Contenedor principal */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-white font-semibold"
              onClick={() => setOpen(false)}
            >
              {/* Si querés, acá podés poner un ícono o logo */}
              <span>Mesa para dos</span>
            </Link>
          </div>

          {/* Menú desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink key={item.path} href={item.path}>
                {item.text}
              </NavLink>
            ))}
            {/* Extra a la derecha (usuario) */}
            <Link
              href="/profile"
              className="px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              Usuario
            </Link>
          </div>

          {/* Botón hamburguesa (solo mobile) */}
          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded hover:bg-gray-800 focus:outline-none"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Ícono hamburguesa / cerrar (simple, sin librerías) */}
            {!open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 6h16v2H4zM4 11h16v2H4zM4 16h16v2H4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.225 4.811 4.811 6.225 10.586 12l-5.775 5.775 1.414 1.414L12 13.414l5.775 5.775 1.414-1.414L13.414 12l5.775-5.775-1.414-1.414L12 10.586 6.225 4.811z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menú mobile desplegable */}
      {open && (
        <div className="lg:hidden border-t border-gray-800">
          <div className="mx-auto max-w-6xl px-4 py-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink key={item.path} href={item.path}>
                {item.text}
              </NavLink>
            ))}

            <Link
              href="/profile"
              className="px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(false)}
            >
              Usuario
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

