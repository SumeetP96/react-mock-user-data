import { createSlice } from "@reduxjs/toolkit";

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

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    filters: DEFAULT_FILTERS,
    loading: false,
    error: null,
    typeColors: TYPE_COLORS,
  },
  reducers: {
    updateUserLoading: (state, action) => {
      state.loading = action.payload;
    },

    updateUserList: (state, action) => {
      state.list = action.payload;
    },

    updateUserError: (state, action) => {
      state.error = action.payload;
    },

    updateUserFilters: (state, action) => {
      const filterName = action.payload;

      if (filterName) {
        if (filterName.toLowerCase() === "all") {
          state.filters = { ...DEFAULT_FILTERS, all: !state.filters.all };
        } else {
          state.filters = {
            ...state.filters,
            all: false,
            [filterName.toLowerCase()]:
              !state.filters[filterName.toLowerCase()],
          };
        }
      }
    },

    filterUsers: (state, action) => {},
  },
});

export const {
  updateUserError,
  updateUserFilters,
  updateUserList,
  updateUserLoading,
  filterUsers,
} = usersSlice.actions;

export default usersSlice.reducer;
