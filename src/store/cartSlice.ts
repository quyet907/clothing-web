import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../models/Cart";

export const cartSlice = createSlice({
	name: "cart",
	initialState: [] as CartItem[],
	reducers: {
		updateCart: (state, action) => {
			console.log(action);
			return state = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
