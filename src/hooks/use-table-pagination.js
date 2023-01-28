import { useEffect, useState } from "react";

const DEFAULT_PER_PAGE = 10;
const DEFAULT_CURRENT_PAGE = 1;

export default function useTablePagination({
  dependency = null,
  defaultPerPage = null,
  defaultCurrentPage = null,
}) {
  const [perPage, setPerPage] = useState(defaultPerPage ?? DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(
    defaultCurrentPage ?? DEFAULT_CURRENT_PAGE
  );
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [dependency]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage + 1 <= totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
    setTotalPages(0);
  };

  return {
    perPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    handlePrevious,
    handleNext,
    handlePerPageChange,
  };
}
