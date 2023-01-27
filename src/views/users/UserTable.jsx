import React, { useEffect, useState } from "react";

const PAGE_OPTIONS = [10, 20, 50];

export default function UserTable({
  users,
  filters,
  loading,
  colors,
  ...props
}) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    const filterUsers = () => {
      let userRecords = [];
      if (filters.all === true) {
        userRecords = users;
      } else {
        userRecords = users.filter(({ type }) => filters[type.toString()]);
      }

      const startIndex = currentPage === 1 ? 0 : (currentPage - 1) * perPage;
      const remainder =
        currentPage === totalPages
          ? userRecords.length - (totalPages - 1) * perPage
          : perPage;
      const endIndex = startIndex + remainder;

      setTotalPages(Math.ceil(userRecords.length / perPage));
      setFilteredUsers(userRecords.slice(startIndex, endIndex));
    };

    filterUsers();

    return () => {
      setFilteredUsers([]);
    };
  }, [filters, users, currentPage, perPage, totalPages]);

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

  return (
    <>
      <div className={`${props?.className} table-responsive-lg`}>
        <table className="mt-4 table table-bordered">
          <thead className="table-light">
            <tr>
              <th className="text-center" style={{ width: "1%" }}>
                #
              </th>
              <th>Email</th>
              <th style={{ minWidth: "200px" }}>Name</th>
              <th className="text-end" style={{ minWidth: "100px" }}>
                Wallet-1
              </th>
              <th className="text-end" style={{ minWidth: "100px" }}>
                Wallet-2
              </th>
              <th className="text-end" style={{ minWidth: "100px" }}>
                Wallet-3
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="2" className="text-center">
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </td>
                <td className="text-center">
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </td>
                <td className="text-center">
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </td>
                <td className="text-center">
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </td>
                <td className="text-center">
                  <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                  </p>
                </td>
              </tr>
            ) : (
              <>
                {filteredUsers.length ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.email}>
                      <td
                        className={`text-center fw-bold ${
                          user.type > 2 ? "text-white" : ""
                        }`}
                        style={{ backgroundColor: colors[user.type] }}
                      >
                        {currentPage === 1
                          ? index + 1
                          : (currentPage - 1) * perPage + index + 1}
                      </td>
                      <td>{user.email}</td>
                      <td>{user.fullName}</td>
                      <td className="text-end">{user.wallet1}</td>
                      <td className="text-end">{user.wallet2}</td>
                      <td className="text-end">{user.wallet3}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="100%" className="text-center">
                      Noting to display.
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 d-flex justify-content-between align-items-center">
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
    </>
  );
}
