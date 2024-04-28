import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { addEvents } from "../store/eventSlice";
import { RootState } from "@/store/store";
import { API_ENDPOINT } from "@/lib/constants";
import { toast } from "sonner";

const useEvents = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const events = useSelector((store: RootState) => store.events.eventsList);
  async function getEvents() {
    await axios
      .get(API_ENDPOINT + "event/get")
      .then((res) => {
        dispatch(addEvents(res.data));
        setLoading(false);
      })
      .catch((error) => {
        toast(error);
        setLoading(false);
      });
  }
  useEffect(() => {
    !events && getEvents();
  }, []);

  return { loading };
};

export default useEvents;
