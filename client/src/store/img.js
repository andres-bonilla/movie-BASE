import { createSlice } from "@reduxjs/toolkit";

const initialState = { secureUrl: "", sizes: null };

export const imgSlice = createSlice({
  name: "img",
  initialState,
  reducers: {
    setImgData(state, action) {
      return action.payload ? action.payload : initialState;
    },
  },
});

export const { setImgData } = imgSlice.actions;

export default imgSlice.reducer;
