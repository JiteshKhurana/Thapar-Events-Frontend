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
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;