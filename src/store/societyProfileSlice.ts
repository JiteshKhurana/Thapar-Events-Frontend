import { Society } from "../store/societySlice";
import { createSlice } from "@reduxjs/toolkit";

interface SocietyState {
  currentSociety: Society | null;
}
const initialState: SocietyState = {
  currentSociety: null,
};

const societyProfileSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addSociety: (state, action) => {
      state.currentSociety = action.payload;
    },
    editSociety: (state, action) => {
      state.currentSociety = action.payload;
    },
    deletecurrentSociety: (state) => {
      state.currentSociety = null;
    },
  },
});

export const { addSociety, editSociety, deletecurrentSociety } =
  societyProfileSlice.actions;
export default societyProfileSlice.reducer;
