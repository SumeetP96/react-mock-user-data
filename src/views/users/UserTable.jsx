import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../components/TableLoadingRow";
import useTablePagination from "../../hooks/use-table-pagination";
import TablePagination from "../../components/TablePagination";

export default function UserTable({
  users,
  filters,
  loading,
  typeColors,
  ...props
}) {
  const pagination = useTablePagination({ dependency: filters });
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    perPage,
    currentPage,
    totalPages,
    setTotalPages,
    handlePrevious,
    handleNext,
    handlePerPageChange,
  } = pagination;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, users, currentPage, perPage, totalPages]);

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
              <TableLoadingRow rows={5} cols={6} />
            ) : (
              <>
                {filteredUsers.length ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user.email}>
                      <td
                        className={`text-center fw-bold ${
                          user.type > 2 ? "text-white" : ""
                        }`}
                        style={{ backgroundColor: typeColors[user.type] }}
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

      <TablePagination
        className="mt-2 mt-md-4"
        perPage={perPage}
        currentPage={currentPage}
        totalPages={totalPages}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePerPageChange={handlePerPageChange}
      />
    </>
  );
}
