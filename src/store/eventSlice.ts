import { createSlice } from "@reduxjs/toolkit";

export interface Event {
  start_date: number;
  end_date: number;
  description: string;
  eligibility: string;
  email: string;
  event_mode: string;
  event_type: string;
  hashtags: string[];
  prizes: string[];
  soc_name: string;
  team: string;
  title: string;
  visibility: string;
  social_media: object;
  _Eid: string;
  _Sid: string;
  _Uid: string;
  image: string;
  venue: string;
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
