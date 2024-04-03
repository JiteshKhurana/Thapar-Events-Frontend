import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import societyReducer from "./societySlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    events: eventReducer,
    societies: societyReducer,
  },
});

export default store;
