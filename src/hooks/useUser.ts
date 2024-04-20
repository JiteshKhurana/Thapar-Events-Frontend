import { API_ENDPOINT } from "@/lib/constants";
import { RootState } from "@/store/store";
import { addUser, addUserRegistrations } from "@/store/UserSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const useUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store: RootState) => store.user.currentUser);
  const currentUserRegistrations = useSelector(
    (store: RootState) => store.user.currentUserRegistrations
  );
  const cookies = new Cookies(null, { path: "/" });
  const userEmail = localStorage.getItem("email");
  const token = cookies.get("token");
  async function getUser() {
    axios
      .get(API_ENDPOINT + "users/get?email=" + userEmail, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(addUser(res.data)))
      .catch((error) => {
        toast(error);
      });
  }
  async function getUserRegistrations() {
    axios
      .get(API_ENDPOINT + "users/get/registrations", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(addUserRegistrations(res.data)))
      .catch((error) => {
        toast(error);
      });
  }

  useEffect(() => {
    !currentUser && getUser();
    !currentUserRegistrations && getUserRegistrations();
  }, []);
};

export default useUser;
