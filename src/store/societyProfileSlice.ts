import { Society } from "../store/societySlice";
import { createSlice } from "@reduxjs/toolkit";

interface currentSocietyMetrics {
  teamMembers: number;
  totalEvents: number;
  upcomingEvents: number;
}

interface SocietyState {
  currentSociety: Society | null;
  currentSocietyMetrics: currentSocietyMetrics | null;
}
const initialState: SocietyState = {
  currentSociety: null,
  currentSocietyMetrics: null,
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
} = societyProfileSlice.actions;
export default societyProfileSlice.reducer;
