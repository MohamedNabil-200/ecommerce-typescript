import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/index";
import axios from "axios";
import { axiosErrorHandler } from "@/utils";
import { TProduct } from "@/types";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "/cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsIds = Object.keys(cart.items);

    if (!itemsIds.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedIds = itemsIds.map((id) => `id=${id}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatenatedIds}`,
        { signal },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetProductsByItems;
