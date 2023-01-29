import React, { useEffect, useState } from "react";
import TableLoadingRow from "../../../components/TableLoadingRow";
import useTablePagination from "../../../hooks/use-table-pagination";
import TablePagination from "../../../components/TablePagination";
import { useSelector } from "react-redux";

export default function UserTable({ ...props }) {
  const { list, filters, typeColors, loading } = useSelector(
    (state) => state.users
  );

  const [filteredUsers, setFilteredUsers] = useState([]);
  const {
    perPage,
    currentPage,
    setCurrentPage,
    totalPages,
    handlePrevious,
    handleNext,
    handlePerPageChange,
    getPaginatedRecords,
  } = useTablePagination({ defaultPerPage: 10 });

  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    const filterUsers = () => {
      let userRecords = [];
      if (filters.all === true) {
        userRecords = list;
      } else {
        userRecords = list.filter(({ type }) => filters[type.toString()]);
      }
      setFilteredUsers(getPaginatedRecords(userRecords));
    };

    filterUsers();

    return () => {
      setFilteredUsers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, list, currentPage, perPage, totalPages]);

  return (
    <>
      <div className={`${props?.className} table-responsive-lg`} {...props}>
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
