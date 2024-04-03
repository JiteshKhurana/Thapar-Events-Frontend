import { createSlice } from "@reduxjs/toolkit";

interface Society {
  about: string;
  email: string;
  name: string;
  role: string;
  year_of_formation: string;
  _Sid: string;
  _Uid: string;
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
