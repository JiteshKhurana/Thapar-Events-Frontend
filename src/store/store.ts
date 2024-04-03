import { configureStore } from "@reduxjs/toolkit";
import eventReducer from "./eventSlice";
import societyReducer from "./societySlice";
import userReducer from "./UserSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    events: eventReducer,
    societies: societyReducer,
    user: userReducer,
  },
});

export default store;
