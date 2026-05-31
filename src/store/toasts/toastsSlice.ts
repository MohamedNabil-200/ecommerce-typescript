import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { TToast } from "@/types";

type TToastsState = { records: TToast[] };

const initialState: TToastsState = {
  records: [],
};

const toastsSlice = createSlice({
  name: "toasts",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<TToast>) => {
      state.records.push({ ...action.payload, id: nanoid() });
    },
    removeToast: (state, action: PayloadAction<TToast["id"]>) => {
      state.records = state.records.filter((el) => el.id !== action.payload);
    },
  },
});

export const { removeToast, addToast } = toastsSlice.actions;
export default toastsSlice.reducer;
