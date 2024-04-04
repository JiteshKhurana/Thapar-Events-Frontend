import { API_ENDPOINT } from "@/lib/constants";
import { addSocieties } from "@/store/societySlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useSocieties = () => {
  const dispatch = useDispatch();
  const societies = useSelector(
    (store: RootState) => store.societies.societiesList
  );

  async function getSocieties() {
    axios
      .get(API_ENDPOINT + "soc/get")
      .then((res) => dispatch(addSocieties(res.data)))
      .catch((error) => {
        toast(error);
      });
  }

  useEffect(() => {
    !societies && getSocieties();
  }, []);
};

export default useSocieties;
