// src/hooks/useScrollToTopOnFirstMount.ts
import { useEffect } from "react";

export function useScrollToTopOnFirstMount() {
  useEffect(() => {
    const canRestore = "scrollRestoration" in history;
    const prev = canRestore ? (history.scrollRestoration as "auto" | "manual") : "auto";
    if (canRestore) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => { if (canRestore) history.scrollRestoration = prev; };
  }, []);
}
