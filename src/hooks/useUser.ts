import { RootState } from "@/store/store";
import { addUser } from "@/store/UserSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const useUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store: RootState) => store.user.currentUser);
  const cookies = new Cookies(null, { path: "/" });
  const userEmail = localStorage.getItem("email");
  const token = cookies.get("token");
  async function getUser() {
    axios
      .get(
        "https://thapar-event-management-system-production.up.railway.app/users/get?email=" +
          userEmail,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => dispatch(addUser(res.data)))
      .catch((error) => {
        toast(error);
      });
  }

  useEffect(() => {
    !currentUser && getUser();
  });
};

export default useUser;
