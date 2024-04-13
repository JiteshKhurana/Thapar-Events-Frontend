import { API_ENDPOINT } from "@/lib/constants";
import { addSociety } from "@/store/societyProfileSlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useSocietyProfile = () => {
  const dispatch = useDispatch();
  const currentSociety = useSelector(
    (store: RootState) => store.society.currentSociety
  );
  const societyID = localStorage.getItem("id");
  async function getSociety() {
    axios
      .get(API_ENDPOINT + "soc/get?societyId=" + societyID)
      .then((res) => dispatch(addSociety(res.data)))
      .catch((error) => {
        toast(error);
      });
  }

  useEffect(() => {
    !currentSociety && getSociety();
  });
};

export default useSocietyProfile;
