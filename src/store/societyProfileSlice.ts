import { Society } from "../store/societySlice";
import { Event } from "./eventSlice";
import { createSlice } from "@reduxjs/toolkit";

interface currentSocietyMetrics {
  teamMembers: number;
  totalEvents: number;
  upcomingEvents: number;
}

interface SocietyState {
  currentSociety: Society | null;
  currentSocietyMetrics: currentSocietyMetrics | null;
  currentSocietyEvents: Event[] | null;
}
const initialState: SocietyState = {
  currentSociety: null,
  currentSocietyMetrics: null,
  currentSocietyEvents: null,
};

const societyProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addSociety: (state, action) => {
      state.currentSociety = action.payload;
    },
    addSocietyMetrics: (state, action) => {
      state.currentSocietyMetrics = action.payload;
    },
    addSocietyEvents: (state, action) => {
      state.currentSocietyEvents = action.payload;
    },
    editSociety: (state, action) => {
      state.currentSociety = action.payload;
    },
    deletecurrentSociety: (state) => {
      state.currentSociety = null;
    },
  },
});

export const {
  addSociety,
  editSociety,
  deletecurrentSociety,
  addSocietyMetrics,
  addSocietyEvents,
} = societyProfileSlice.actions;
export default societyProfileSlice.reducer;
