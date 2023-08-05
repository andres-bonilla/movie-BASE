// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   data: [],
//   status: "idle",
// };

// export const getResult = createAsyncThunk("search/get", async (params) => {
//   const { mediaType, words, oldSearch } = params;
//   const { data } = await axios.get(
//     `/api/search/${mediaType}?by_words=${words}`,
//     {
//       signal: oldSearch ? oldSearch.signal : null,
//     }
//   );
//   return data;
// });

// export const searchSlice = createSlice({
//   name: "search",
//   initialState,
//   reducers: {
//     loadResult(state, action) {
//       return state;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getResult.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(getResult.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.status = "idle";
//       })
//       .addCase(getResult.rejected, (state, action) => {
//         state.status = "error";
//       });
//   },
// });

// export const { loadResult } = searchSlice.actions;

// export default searchSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  actualPage: [],
  spareData: [],
  maxElementsGrid: 20,
  lastReqPageTMDB: 1,
  lastPageTMDB: 0,
  status: "idle",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setMaxElementsGrid(state, action) {
      state.maxElementsGrid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.actualPage = action.payload;
        state.status = "idle";
      })
      .addCase(getResult.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const getResult = createAsyncThunk("search/get", async (params) => {
  const { mediaType, words, oldSearch } = params;
  const { data } = await axios.get(
    `/api/search/${mediaType}?by_words=${words}`,
    {
      signal: oldSearch ? oldSearch.signal : null,
    }
  );
  return data;
});

export const { setMaxElementsGrid } = searchSlice.actions;

export default searchSlice.reducer;
