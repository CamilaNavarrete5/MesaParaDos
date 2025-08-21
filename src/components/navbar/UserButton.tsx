"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export const UserButton = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita render SSR -> elimina mismatches por completo en este componente
  if (!mounted) return null; // o un skeleton minúsculo si querés

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`px-2 py-1 rounded transition-colors duration-200 border mr-2 ${
          open
            ? "border-[#F5ECD5] text-[#F5ECD5]"
            : "border-transparent text-gray-700 hover:bg-[rgba(245,236,213,0.5)] hover:text-gray-800"
        }`}
      >
        <span className="flex items-center gap-2">
          <Image
            src="/icono.jpg"
            alt="Foto de usuario"
            width={25}
            height={25}
            sizes="25px"
            className="rounded-full object-cover border border-[#DEAC80]"
          />
          Usuario
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg p-2 text-gray-800">
          <ul>
            <li className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Perfil</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Configuración</li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">Cerrar sesión</li>
          </ul>
        </div>
      )}
    </div>
  );
};
