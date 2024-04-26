import { createSlice } from "@reduxjs/toolkit";

interface Member {
  name: string;
  email: string;
  position: string;
  instagram: string;
  linkedin: string;
}
interface Faculty {
  name: string;
  email: string;
  position: string;
  linkedin: string;
}
interface SocialMedia {
  Instagram: string;
  Linkedin: string;
  Youtube: string;
  OfficialWebsite: string;
}

export interface Society {
  _Sid: string;
  _Uid: string;
  email: string;
  name: string;
  year_of_formation: string;
  role: string;
  about: string;
  image: string;
  members: Member[];
  faculty: Faculty[];
  social_media: SocialMedia;
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
