// src/hooks/useScrollToRefOnChange.ts
import { RefObject, useEffect } from "react";

export function useScrollToRefOnChange(
  ref: RefObject<HTMLElement>,
  deps: any[],
  offset = 0,
  smooth = true
) {
  useEffect(() => {
    if (!ref.current) return;
    const y = ref.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
