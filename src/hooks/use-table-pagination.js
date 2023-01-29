import { useState } from "react";
import { PAGE_OPTIONS } from "../utils/pagination";

const PER_PAGE = 10;

export default function useTablePagination({ defaultPerPage = null }) {
  const [perPage, setPerPage] = useState(
    defaultPerPage && PAGE_OPTIONS.includes(defaultPerPage)
      ? defaultPerPage
      : PER_PAGE
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  const getPaginatedRecords = (records = []) => {
    if (!records.length) {
      return [];
    }

    const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * perPage;
    const remaining =
      currentPage === totalPages
        ? records.length - (totalPages - 1) * perPage
        : perPage;
    const endIndex = startIndex + remaining;

    setTotalPages(Math.ceil(records.length / perPage));

    return records.slice(startIndex, endIndex);
  };

  return {
    perPage,
    currentPage,
    setCurrentPage,
    totalPages,
    handlePrevious,
    handleNext,
    handlePerPageChange,
    getPaginatedRecords,
  };
}
