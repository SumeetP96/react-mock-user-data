import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserTable from "./components/UserTable";
import UserFilters from "./components/UserFilters";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserLoading,
  updateUserList,
  updateUserError,
} from "../../redux/features/users/usersSlice";

export default function Users() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(updateUserLoading(true));
      try {
        const response = await axios.get(
          "http://www.mocky.io/v2/5d889c8a3300002c0ed7da42"
        );
        if (response?.status === 200) {
          dispatch(updateUserList(response.data.items));
        } else {
          dispatch(updateUserError("Error fetching data from api!"));
        }
      } catch (e) {
        console.log(e.message);
        dispatch(updateUserError("Error fetching data from api!"));
      }
      dispatch(updateUserLoading(false));
    };

    fetchUsers();

    return () => {
      dispatch(updateUserList([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container pt-5">
      <div className="card mb-5 shadow-sm border-1">
        <div className="card-body">
          {/* Card head */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3">
            <h5 className="mb-0">List of Users</h5>
            <Link to="/" className="btn btn-sm btn-outline-secondary">
              Go Back
            </Link>
          </div>

          {/* Card Body */}
          {error ? (
            <div className="alert alert-danger mt-3 mt-md-4">{error}</div>
          ) : (
            <>
              <UserFilters />

              <UserTable />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
