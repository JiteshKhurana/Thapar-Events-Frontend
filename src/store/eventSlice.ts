import { createSlice } from "@reduxjs/toolkit";

interface Event {
  description: string;
  email: string;
  team: false;
  title: string;
  visibility: boolean;
  _Eid: string;
  _Sid: string;
  _Uid: string;
}
interface EventState {
  eventsList: Event[] | null;
}

const initialState: EventState = {
  eventsList: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvents: (state, action) => {
      state.eventsList = action.payload;
    },
  },
});

export const { addEvents } = eventSlice.actions;
export default eventSlice.reducer;
