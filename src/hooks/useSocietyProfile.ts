import { API_ENDPOINT } from "@/lib/constants";
import {
  addSociety,
  addSocietyEvents,
  addSocietyMetrics,
} from "@/store/societyProfileSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const useSocietyProfile = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const currentSociety = useSelector(
    (store: RootState) => store.society.currentSociety
  );
  const currentSocietyMetrics = useSelector(
    (store: RootState) => store.society.currentSocietyMetrics
  );
  const currentSocietyEvents = useSelector(
    (store: RootState) => store.society.currentSocietyEvents
  );
  const societyID = localStorage.getItem("id");
  const societyEmail = localStorage.getItem("email");
  async function getSociety() {
    axios
      .get(API_ENDPOINT + "soc/get?societyId=" + societyID)
      .then((res) => dispatch(addSociety(res.data)))
      .catch((error) => {
        toast(error);
      });
  }
  async function getSocietyMetrics() {
    await axios
      .get(API_ENDPOINT + "soc/dashboard/" + societyEmail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(addSocietyMetrics(res.data)));
  }

  async function getSocietyEvents() {
    await axios
      .get(API_ENDPOINT + "soc/get/events?soc_email=" + societyEmail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(addSocietyEvents(res.data)));
  }

  useEffect(() => {
    !currentSociety && getSociety();
    !currentSocietyMetrics && getSocietyMetrics();
    !currentSocietyEvents && getSocietyEvents();
  }, []);
};

export default useSocietyProfile;
