import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "./selectors/index";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { isString, TProduct } from "@/types";
import { TLoading } from "@/types";

type TCartState = {
  items: { [key: number]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
};

const initialState: TCartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.items[action.payload]) {
        state.items[action.payload]++;
      } else {
        state.items[action.payload] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload,
      );
    },
    cartProductsFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
    cartCleanupAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "idle";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };

export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cartProductsFullInfoCleanUp,
  cartCleanupAfterPlaceOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
