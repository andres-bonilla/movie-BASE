import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  words: "",
  type: "any",
  page: 1,
  animation: {
    in: "fade-in",
    out: "fade-out",
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      const { words, type, page } = action.payload;
      const currentPage = Math.abs(state.page);

      const isWordsChanging = words !== undefined && words !== state.words;
      const isTypeChanging = type && type !== state.type;
      const isPageChanging = page && page !== currentPage;

      if (isPageChanging) {
        if (page === currentPage + 1) {
          state.animation = { in: "right-in", out: "left-out" };
        } else if (page === currentPage - 1) {
          state.animation = { in: "left-in", out: "right-out" };
        }
        const direction = currentPage - 1 === page ? -1 : 1;

        state.page = direction * page;
      }

      if (isWordsChanging || isTypeChanging) {
        state.words = words !== undefined ? words : state.words;
        state.type = type || state.type;
        state.animation = { in: "fade-in", out: "fade-out" };
        if (!isPageChanging) state.page = 1;
      }
    },
    setWords(state, action) {
      state.words = action.payload;
      state.animation = initialState.animation;
    },
    setType(state, action) {
      state.type = action.payload;
      state.animation = initialState.animation;
    },
    setPage(state, action) {
      const currentPage = Math.abs(action.payload);
      if (page === currentPage + 1) {
        newAnimation = { in: "right-in", out: "left-out" };
      } else if (page === currentPage - 1) {
        newAnimation = { in: "left-in", out: "right-out" };
      }

      if (state.animation.in !== newAnimation.in)
        state.animation = newAnimation;

      const direction = currentPage - 1 === action.payload ? -1 : 1;

      state.page = direction * action.payload;
    },
  },
});

export const { setSearch, setWords, setType, setPage } = searchSlice.actions;

export default searchSlice.reducer;
