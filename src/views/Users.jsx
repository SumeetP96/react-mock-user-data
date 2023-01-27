import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "./UserTable";

const TYPE_COLORS = {
  0: "#48BEFF",
  1: "#3DFAFF",
  2: "#43C59E",
  3: "#3D7068",
  4: "#14453D",
};

const DEFAULT_FILTERS = {
  all: true,
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterUpdate = (filterName = null) => {
    if (filterName) {
      if (filterName.toLowerCase() === "all") {
        setFilters({ ...DEFAULT_FILTERS, all: !filters.all });
      } else {
        setFilters((prev) => ({
          ...prev,
          all: false,
          [filterName.toLowerCase()]: !filters[filterName.toLowerCase()],
        }));
      }
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
      <div className="card mb-5 shadow-sm border-1">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
            <h5 className="mb-0">List of Users</h5>
            <Link to="/" className="btn btn-sm btn-outline-secondary">
              Go Back
            </Link>
          </div>

          {error ? (
            <div className="alert alert-danger mt-3 mt-md-4">{error}</div>
          ) : (
            <>
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
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="type0"
                    checked={filters["0"]}
                    onChange={() => handleFilterUpdate("0")}
                  />
                  <label
                    htmlFor="type0"
                    className="form-check-label"
                    style={{ borderBottom: `3px solid ${TYPE_COLORS[0]}` }}
                  >
                    Type 0
                  </label>
                </div>

                <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="type1"
                    checked={filters["1"]}
                    onChange={() => handleFilterUpdate("1")}
                  />
                  <label
                    htmlFor="type1"
                    className="form-check-label"
                    style={{ borderBottom: `3px solid ${TYPE_COLORS[1]}` }}
                  >
                    Type 1
                  </label>
                </div>

                <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="type2"
                    checked={filters["2"]}
                    onChange={() => handleFilterUpdate("2")}
                  />
                  <label
                    htmlFor="type2"
                    className="form-check-label"
                    style={{ borderBottom: `3px solid ${TYPE_COLORS[2]}` }}
                  >
                    Type 2
                  </label>
                </div>

                <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="type3"
                    checked={filters["3"]}
                    onChange={() => handleFilterUpdate("3")}
                  />
                  <label
                    htmlFor="type3"
                    className="form-check-label"
                    style={{ borderBottom: `3px solid ${TYPE_COLORS[3]}` }}
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
                    onChange={() => handleFilterUpdate("4")}
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

              <UserTable
                loading={loading}
                users={users}
                filters={filters}
                colors={TYPE_COLORS}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
