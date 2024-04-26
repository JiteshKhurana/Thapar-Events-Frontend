import { createSlice } from "@reduxjs/toolkit";

interface Deadlines {
  date: Date;
  title: string;
  description: string;
}
interface Rounds {
  name: string;
  description: string;
}
interface Prizes {
  name: string;
  description: string;
}
interface Parameters {
  name: string;
  description: string;
}

export interface Event {
  start_date: Date;
  end_date: Date;
  description: string;
  eligibility: string;
  email: string;
  event_mode: string;
  event_type: string;
  hashtags: string[];
  soc_name: string;
  team: string;
  title: string;
  visibility: string;
  register: string;
  _Eid: string;
  _Sid: string;
  _Uid: string;
  image: string;
  venue: string;
  deadlines: Deadlines[];
  rounds: Rounds[];
  prizes: Prizes[];
  parameters: Parameters[];
  photo_gallery: string[];
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
