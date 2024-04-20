import { createSlice } from "@reduxjs/toolkit";
import { Event } from "./eventSlice";

interface cem {
  totalregistrations: number;
}

interface EventState {
  currentEvent: Event | null;
  currentEventMetrics: cem | null;
}

const initialState: EventState = {
  currentEvent: null,
  currentEventMetrics: null,
};

const eventDashboardSlice = createSlice({
  name: "eventDashboard",
  initialState,
  reducers: {
    addCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
    editCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
    removeCurrentEvent: (state) => {
      state.currentEvent = null;
    },
    addCurrentEventMetrics: (state, action) => {
      state.currentEventMetrics = action.payload;
    },
  },
});

export const {
  addCurrentEvent,
  editCurrentEvent,
  addCurrentEventMetrics,
  removeCurrentEvent,
} = eventDashboardSlice.actions;
export default eventDashboardSlice.reducer;
