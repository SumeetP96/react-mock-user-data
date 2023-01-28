import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserFilters } from "../../../redux/features/users/usersSlice";

export default function UserFilters() {
  const { filters, typeColors } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div className="px-4 row" style={{ userSelect: "none" }}>
      <div className="form-check mt-3 mt-md-4 col-md-4 col-lg-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="allUsers"
          checked={filters.all}
          onChange={() => dispatch(updateUserFilters("all"))}
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
          onChange={() => dispatch(updateUserFilters("0"))}
        />
        <label
          htmlFor="type0"
          className="form-check-label"
          style={{ borderBottom: `3px solid ${typeColors[0]}` }}
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
          onChange={() => dispatch(updateUserFilters("1"))}
        />
        <label
          htmlFor="type1"
          className="form-check-label"
          style={{ borderBottom: `3px solid ${typeColors[1]}` }}
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
          onChange={() => dispatch(updateUserFilters("2"))}
        />
        <label
          htmlFor="type2"
          className="form-check-label"
          style={{ borderBottom: `3px solid ${typeColors[2]}` }}
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
          onChange={() => dispatch(updateUserFilters("3"))}
        />
        <label
          htmlFor="type3"
          className="form-check-label"
          style={{ borderBottom: `3px solid ${typeColors[3]}` }}
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
          onChange={() => dispatch(updateUserFilters("4"))}
        />
        <label
          htmlFor="type4"
          className="form-check-label"
          style={{ borderBottom: `3px solid ${typeColors[4]}` }}
        >
          Type 4
        </label>
      </div>
    </div>
  );
}
