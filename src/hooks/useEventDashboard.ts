import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { RootState } from "@/store/store";
import { API_ENDPOINT } from "@/lib/constants";
import { addCurrentEvent } from "@/store/eventDashboardSlice";

const useEventDashboard = (eventId: string) => {
  const dispatch = useDispatch();
  const currentEvent = useSelector(
    (store: RootState) => store.eventDashboard.currentEvent
  );
  async function getEvent() {
    await axios
      .get(API_ENDPOINT + "event/get?eventId=" + eventId)
      .then((res) => dispatch(addCurrentEvent(res.data)))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    !currentEvent && getEvent();
  }, []);
};

export default useEventDashboard;
