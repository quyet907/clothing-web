import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../models/Cart";

export const authentication = createSlice({
	name: "authentication",
	initialState: false,
	reducers: {
		update: (state, action) => {
			console.log(action);
			return (state = action.payload);
		},
	},
});

// Action creators are generated for each case reducer function
export const { update } = authentication.actions;
export default authentication.reducer;
