import { createSlice } from "@reduxjs/toolkit";

interface Event {
  date: number;
  description: string;
  eligibility: string;
  email: string;
  event_mode: string;
  event_type: string;
  hashtags: string[];
  prizes: string[];
  soc_name: string;
  team: boolean;
  title: string;
  visibility: boolean;
  social_media: string[];
  _Eid: string;
  _Sid: string;
  _Uid: string;
}
export interface EventState {
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
