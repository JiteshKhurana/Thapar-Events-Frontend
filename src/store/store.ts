import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;
