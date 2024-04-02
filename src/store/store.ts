import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: eventReducer,
});

export default store;
