"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  path: string;
  text: string;
}

export const ActiveLink = ({ path, text }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      aria-current={isActive ? "page" : undefined}
      className={[
        "relative inline-flex items-center justify-center",
        "px-3 py-1.5 rounded-full text-sm md:text-base font-medium",
        "transition-all duration-200",
        isActive
          ? "bg-[#F3EEE6] text-[#3C3C3C] shadow-sm ring-1 ring-[#6B8B5B]/60"
          : "text-[#FAF9F6] hover:bg-[#8D9F77] hover:text-[#FAF9F6]"
      ].join(" ")}
    >
      {text}
      {isActive && (
        <span
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
          aria-hidden
        />
      )}
    </Link>
  );
};
