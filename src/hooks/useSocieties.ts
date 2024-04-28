import { addSocieties } from "@/store/societySlice";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const useSocieties = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const societies = useSelector(
    (store: RootState) => store.societies.societiesList
  );

  async function getSocieties() {
    await axios
      .get(import.meta.env.VITE_API_ENDPOINT + "soc/get")
      .then((res) => {
        dispatch(addSocieties(res.data));
        setLoading(false);
      })
      .catch((error) => {
        toast(error);
        setLoading(false);
      });
  }

  useEffect(() => {
    !societies && getSocieties();
  }, []);

  return { loading };
};

export default useSocieties;
