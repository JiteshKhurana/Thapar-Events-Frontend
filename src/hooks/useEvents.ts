import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addEvents } from "../store/eventSlice";
import { RootState } from "@/store/store";

const useEvents = () => {
  console.log("hi");
  const dispatch = useDispatch();
  const events = useSelector((store: RootState) => store.events.eventsList);
  async function getEvents() {
    axios
      .get(
        "https://thapar-event-management-system-production.up.railway.app/event/get"
      )
      .then((res) => dispatch(addEvents(res.data)));
  }
  useEffect(() => {
    events.length == 0 && getEvents();
  }, []);
};

export default useEvents;
