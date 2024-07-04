import { useMemo, useEffect } from "react";

export const usePaginationCustom = (
  page: number,
  total: number,
  limit: number,
  setPage: any
) => {
  const currentPage = useMemo(() => {
    return page && !Number.isNaN(Number(page)) && Number.isInteger(Number(page))
      ? Number(page) - 1
      : 0;
  }, [page]);

  const maxPage = useMemo(() => {
    const sizePage = total === 0 ? 0 : Math.ceil(total / limit);
    return sizePage;
  }, [total, limit]);

  useEffect(() => {
    if (typeof window !== "undefined" && currentPage > maxPage - 1) {
      setPage(1);
    }
  }, [currentPage, maxPage]);

  return { currentPage, maxPage };
};

// examplle
// const { currentPage, maxPage } = usePaginationCustom(page, total, limit, setPage);
