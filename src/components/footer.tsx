"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaMapMarkerAlt,
  FaGithub,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer
      className="
        mt-10 md:mt-[40px] w-full
        bg-[#4a3f35] text-[#F5EEE6]
      "
    >
      {/* Contenedor interno: USÁ EL MISMO max-w QUE TU LAYOUT CENTRAL */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid superior */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Col 1: Marca + descripción + redes */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/icono.jpg"
                alt="Mesa para Dos"
                width={40}
                height={40}
                className="rounded-full border border-[#DEAC80]"
              />
              <span className="text-xl font-bold leading-none">
                Mesa para Dos
              </span>
            </div>

            <p className="text-sm text-[#E9E1D8]/85 leading-relaxed">
              Reseñas sinceras de restaurantes, bares y cafeterías en Argentina.
              Probamos para que vos elijas mejor.
            </p>

            {/* Redes */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: FaGithub, href: "https://github.com/CamilaNavarrete5/MesaParaDos", label: "GitHub" },
                { Icon: FaInstagram, href: "/", label: "Instagram" },
                { Icon: FaTiktok, href: "/", label: "TikTok" },
                { Icon: FaYoutube, href: "/", label: "YouTube" },
                { Icon: FaTwitter, href: "/", label: "X/Twitter" },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  aria-label={label}
                  href={href}
                  className="
                    rounded-full p-2.5
                    bg-[#5d5753]
                    transition
                    hover:bg-[var(--primary)]
                    hover:text-[#2F2A26]
                  "
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-semibold tracking-wide mb-3">
              ¡Suscribite!
            </h4>
            <p className="text-sm text-[#E9E1D8]/80 mb-4 leading-relaxed">
              Novedades, aperturas y hallazgos directo a tu inbox.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: conectar servicio de email
                setEmail("");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full rounded-md
                  border border-[#4A423D] bg-[#3B3632]
                  px-3 py-2 text-sm
                  placeholder:text-[#E9E1D8]/50
                  focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
                "
              />
              <button
                type="submit"
                className="
                  rounded-md
                  bg-[var(--primary)]
                  px-3 py-2 text-sm font-semibold
                  text-[#2F2A26]
                  transition
                  hover:opacity-90
                "
              >
                Suscribirme
              </button>
            </form>
          </div>

          {/* Col 3: CTA mapa + mini-galería */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">
              Explorá cerca tuyo
            </h4>

            {/* Botón con mismo estilo que tus botones verdes */}
            <Link
              href="/map"
              className="
                inline-flex items-center gap-2
                rounded-full
                bg-[var(--primary)]
                px-4 py-2 text-sm font-semibold
                text-[#2F2A26]
                transition
                hover:opacity-90
              "
            >
              <FaMapMarkerAlt />
              Ver mapa de ubicaciones
            </Link>

            <div className="grid grid-cols-4 gap-2 pt-1">
              {[
                "/images/sample1.jpg",
                "/images/sample2.jpg",
                "/images/sample3.jpg",
                "/images/sample4.jpg",
              ].map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-md border border-[#4A423D]"
                >
                  <Image
                    src={src}
                    alt="Miniatura"
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior (legales) */}
        <div
          className="
            mt-12 border-t border-[#4A423D]
            pt-3 pb-6
            flex flex-col gap-4
            md:flex-row md:items-center md:justify-between
          "
        >
          <ul className="text-sm text-[#E9E1D8]/80 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-[var(--primary)]">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[var(--primary)]">
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-[var(--primary)]">
                Cookies
              </Link>
            </li>
          </ul>

          <p className="text-sm text-[#E9E1D8]/60 md:text-right">
            © {new Date().getFullYear()} Mesa para Dos. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
