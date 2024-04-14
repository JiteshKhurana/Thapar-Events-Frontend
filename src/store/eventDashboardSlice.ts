import { createSlice } from "@reduxjs/toolkit";
import { Event } from "./eventSlice";

export interface EventState {
  currentEvent: Event | null;
}

const initialState: EventState = {
  currentEvent: null,
};

const eventDashboardSlice = createSlice({
  name: "eventDashboard",
  initialState,
  reducers: {
    addCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
});

export const { addCurrentEvent } = eventDashboardSlice.actions;
export default eventDashboardSlice.reducer;
