import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TYPE_COLORS = {
  0: "#48BEFF",
  1: "#3DFAFF",
  2: "#43C59E",
  3: "#3D7068",
  4: "#14453D",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    all: true,
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterUpdate = (filterName = null) => {
    if (filterName) {
      setFilters((prev) => ({
        ...prev,
        [filterName.toLowerCase()]: !filters[filterName.toLowerCase()],
      }));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://www.mocky.io/v2/5d889c8a3300002c0ed7da42"
        );
        if (response?.status === 200) {
          setUsers(response.data.items);
        } else {
          setError("Error fetching data from api!");
        }
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    };

    fetchUsers();

    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <div className="container pt-5">
      <div className="card shadow-sm border-1">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
            <h5 className="mb-0">List of Users</h5>
            <Link to="/" className="btn btn-sm btn-outline-secondary">
              Go Back
            </Link>
          </div>

          <div className="px-4 row" style={{ userSelect: "none" }}>
            <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="allUsers"
                checked={filters.all}
                onChange={() => handleFilterUpdate("all")}
              />
              <label htmlFor="allUsers" className="form-check-label">
                All Types
              </label>
            </div>

            <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
              <input type="checkbox" className="form-check-input" id="type0" />
              <label
                htmlFor="type0"
                className="form-check-label"
                style={{ borderBottom: `3px solid ${TYPE_COLORS[0]}` }}
                checked={filters["0"]}
                onChange={() => handleFilterUpdate(0)}
              >
                Type 0
              </label>
            </div>

            <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
              <input type="checkbox" className="form-check-input" id="type1" />
              <label
                htmlFor="type1"
                className="form-check-label"
                style={{ borderBottom: `3px solid ${TYPE_COLORS[1]}` }}
                checked={filters["1"]}
                onChange={() => handleFilterUpdate(1)}
              >
                Type 1
              </label>
            </div>

            <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
              <input type="checkbox" className="form-check-input" id="type2" />
              <label
                htmlFor="type2"
                className="form-check-label"
                style={{ borderBottom: `3px solid ${TYPE_COLORS[2]}` }}
                checked={filters["2"]}
                onChange={() => handleFilterUpdate(2)}
              >
                Type 2
              </label>
            </div>

            <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
              <input type="checkbox" className="form-check-input" id="type3" />
              <label
                htmlFor="type3"
                className="form-check-label"
                style={{ borderBottom: `3px solid ${TYPE_COLORS[3]}` }}
                checked={filters["3"]}
                onChange={() => handleFilterUpdate(3)}
              >
                Type 3
              </label>
            </div>

            <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="type4"
                checked={filters["4"]}
                onChange={() => handleFilterUpdate(4)}
              />
              <label
                htmlFor="type4"
                className="form-check-label"
                style={{ borderBottom: `3px solid ${TYPE_COLORS[4]}` }}
              >
                Type 4
              </label>
            </div>
          </div>

          <table className="mt-4 table table-bordered">
            <thead className="table-light">
              <tr>
                <th className="text-center" style={{ width: "1%" }}>
                  #
                </th>
                <th>Email</th>
                <th>Name</th>
                <th className="text-end">Wallet-1</th>
                <th className="text-end">Wallet-2</th>
                <th className="text-end">Wallet-3</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="100%" className="text-center">
                    Loading Data...
                  </td>
                </tr>
              ) : (
                <>
                  {users.length ? (
                    users.map((user, index) => (
                      <tr key={Math.round(Math.random() * 1e10)}>
                        <td className="text-center fw-bold">{index + 1}</td>
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
                        Data not found.
                      </td>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
