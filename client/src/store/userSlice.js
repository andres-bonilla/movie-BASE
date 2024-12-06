import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    isLoged(state, action) {
      return action.payload;
    },
  },
});

export const { isLoged } = userSlice.actions;

export default userSlice.reducer;
