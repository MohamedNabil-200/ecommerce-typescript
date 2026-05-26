import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByCatPrefix from "./act/actGetProductsByCatPrefix";
import { isString, TLoading, TProduct } from "@/types";

type TProductsState = {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
};

const initialState: TProductsState = {
  records: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRecordsCleanUp: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "idle";
      state.records = action.payload;
    });
    builder.addCase(actGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { productsRecordsCleanUp } = productsSlice.actions;
export { actGetProductsByCatPrefix };
export default productsSlice.reducer;
