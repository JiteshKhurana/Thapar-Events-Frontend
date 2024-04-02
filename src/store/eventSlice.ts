import { createSlice } from "@reduxjs/toolkit";

// interface Event {
//   description: string;
//   email: string;
//   team: false;
//   title: string;
//   visibility: boolean;
//   _Eid: string;
//   _Sid: string;
//   _Uid: string;
// }

const initialState = {
  events: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { addEvents } = eventSlice.actions;
export default eventSlice.reducer;
