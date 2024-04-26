import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { addEventPosterFields, addEventPosterSchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "universal-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { API_ENDPOINT } from "@/lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AddEventPoster = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const event = useSelector(
    (store: RootState) => store.eventDashboard.currentEvent
  );
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<addEventPosterFields>({
    defaultValues: {
      photos: undefined,
    },
    resolver: zodResolver(addEventPosterSchema),
  });

  const [success, setSuccess] = useState(false);
  if (success) {
    toast("Sucessfully Updated!! 🥳");
    setSuccess(false);
  }
  if (!event) return <div>Loading...</div>;
  const onSubmit: SubmitHandler<addEventPosterFields> = async (data) => {
    const formData = new FormData();
    if (data.photos) {
      formData.append("photos", data.photos[0]);
    }

    await axios
      .post(API_ENDPOINT + "event/poster/upload/" + event?._Eid, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setSuccess(true);
        reset();
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-semibold text-2xl mt-3 flex flex-wrap m-5">
        Add Event Poster
      </h1>
      <p className="text-red-500">
        Please ensure your image has an aspect ratio of 16:9.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input {...register("photos")} type="file" accept="image/*" />
        {errors.photos && (
          <div className="text-red-500">{String(errors.photos.message)}</div>
        )}
        <Button className="w-full" disabled={isSubmitting} type="submit">
          Submit
        </Button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default AddEventPoster;
