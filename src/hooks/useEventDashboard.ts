import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { RootState } from "@/store/store";
import { API_ENDPOINT } from "@/lib/constants";
import {
  addCurrentEvent,
  addCurrentEventMetrics,
} from "@/store/eventDashboardSlice";
import Cookies from "universal-cookie";

const useEventDashboard = (eventId: string) => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
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
  async function getEventMetrics() {
    await axios
      .get(API_ENDPOINT + "event/dashboard/" + eventId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(addCurrentEventMetrics(res.data)))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    !currentEvent && getEvent();
    getEventMetrics();
  }, []);
};

export default useEventDashboard;
