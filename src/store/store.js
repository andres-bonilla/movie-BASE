// STORE CREATION
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import imgReducer from "./img";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";

const logger = createLogger({
  collapsed: true,
});

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware().concat(logger);

export const store = configureStore({
  middleware,
  reducer: {
    user: userReducer,
    img: imgReducer,
    search: searchReducer,
  },
});
