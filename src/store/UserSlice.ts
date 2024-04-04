import { createSlice } from "@reduxjs/toolkit";

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
}
const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    editUser: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { addUser, deleteUser, editUser } = userSlice.actions;
export default userSlice.reducer;
