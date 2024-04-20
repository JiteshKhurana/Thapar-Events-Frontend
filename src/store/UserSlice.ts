import { createSlice } from "@reduxjs/toolkit";
import { Event } from "./eventSlice";

interface User {
  batch: string;
  branch: string;
  email: string;
  image: string;
  name: string;
  phone: string;
  role: string;
  rollno: string;
  _id: string;
}

interface UserState {
  currentUser: User | null;
  currentUserRegistrations: Event[] | null;
}
const initialState: UserState = {
  currentUser: null,
  currentUserRegistrations: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUserRegistrations: (state, action) => {
      state.currentUserRegistrations = action.payload;
    },
    editUser: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, addUserRegistrations, deleteUser, editUser } =
  userSlice.actions;
export default userSlice.reducer;
