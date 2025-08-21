// src/hooks/usePagination.ts
import { useMemo, useState } from "react";

export function usePagination<T>(items: T[], pageSize = 9) {
  const [page, setPage] = useState(1);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { page, setPage, pageItems, totalItems, totalPages, pageSize };
}
