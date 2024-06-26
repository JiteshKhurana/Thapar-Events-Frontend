import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addEvents } from "../store/eventSlice";
import { RootState } from "@/store/store";

const useEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector((store: RootState) => store.events.eventsList);
  async function getEvents() {
    await axios
      .get(import.meta.env.VITE_API_ENDPOINT + "event/get")
      .then((res) => dispatch(addEvents(res.data)));
  }
  useEffect(() => {
    !events && getEvents();
  }, []);
};

export default useEvents;
