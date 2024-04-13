import { createSlice } from "@reduxjs/toolkit";

interface Society {
  _Sid: string;
  _Uid: string;
  email: string;
  name: string;
  year_of_formation: string;
  role: string;
  about: string;
}

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
