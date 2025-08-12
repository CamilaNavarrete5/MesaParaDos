"use client";

import { useState } from "react";

export const UserButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-2 py-1 rounded transition-colors duration-200 border mr-2 ${
          open
            ? "border-[#F5ECD5] text-[#F5ECD5]"
            : "border-transparent text-gray-700 hover:bg-[rgba(245,236,213,0.5)] hover:text-gray-800"
        }`}
      >
        Usuario
      </button>
{/* 
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg p-2 text-gray-800">
          <ul>
            <li className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              Perfil
            </li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              Configuración
            </li>
            <li className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer">
              Cerrar sesión
            </li>
          </ul>
        </div>
      )} */}
    </div>
  );
};
