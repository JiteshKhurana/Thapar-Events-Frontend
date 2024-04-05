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
  societiesList: Society[] | null;
}

const initialState: SocietyState = {
  societiesList: null,
};

const societySlice = createSlice({
  name: "societies",
  initialState,
  reducers: {
    addSocieties: (state, action) => {
      state.societiesList = action.payload;
    },
  },
});

export const { addSocieties } = societySlice.actions;
export default societySlice.reducer;
