import { ReactNode } from "react";
import { NavBar } from "@/src/components/navbar";
import Footer from "@/src/components/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* full‑bleed header */}
      <NavBar />

      <div className="mx-auto w-full max-w-screen-2xl px-4 lg:px-40">
        {children}
      </div>
      <Footer/>
    </>
  );
}
