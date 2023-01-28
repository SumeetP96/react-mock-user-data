import React from "react";

const PAGE_OPTIONS = [10, 20, 50];

export default function TablePagination({
  perPage,
  currentPage,
  totalPages,
  handlePerPageChange,
  handlePrevious,
  handleNext,
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props?.className} d-flex justify-content-between align-items-center`}
    >
      <div className="d-inline-flex align-items-center">
        <div className="me-2 d-none d-md-inline-block">Per Page</div>
        <select
          className="form-select form-select-sm ml-2"
          style={{ width: "80px" }}
          defaultValue={perPage}
          onChange={handlePerPageChange}
        >
          {PAGE_OPTIONS.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {totalPages ? (
        <div>
          Page {currentPage} of {totalPages}
        </div>
      ) : null}

      <div className="btn-group">
        <button
          className="btn btn-sm btn-primary"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <button
          className="btn btn-sm btn-primary"
          onClick={handleNext}
          disabled={currentPage + 1 > totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
