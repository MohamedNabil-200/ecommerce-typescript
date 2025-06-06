import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading, TCategory, isString } from "@types";

type TCategoriesState = {
  records: TCategory[];
  loading: TLoading;
  error: string | null;
};

const initialState: TCategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesRecordsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "idle";
      state.records = action.payload;
    });
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetCategories };
export const { categoriesRecordsCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;
