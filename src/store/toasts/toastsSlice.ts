import { createSlice } from "@reduxjs/toolkit";
import { TToast } from "@types";

type TToastsState = { records: TToast[] };

const initialState: TToastsState = {
  records: [
    {
      id: "1",
      type: "success",
      title: "add to cart",
      message: "product added to Your cart",
    },
    {
      id: "2",
      type: "error",
      message: "Error from the server!",
    },
    {
      id: "3",
      type: "warning",
      message: "Your Session will expire soon",
    },
    {
      id: "4",
      type: "info",
      message: "lorem ipsum dolor sit amet",
    },
  ],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {},
});

export default toastsSlice.reducer;
