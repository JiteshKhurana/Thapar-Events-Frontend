import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ENDPOINT } from "@/lib/constants";
import { addEventGalleryFields, addEventGallerySchema } from "@/schemas/schema";
import { RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const AddPhotoGallery = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const event = useSelector(
    (store: RootState) => store.eventDashboard.currentEvent
  );
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<addEventGalleryFields>({
    defaultValues: {
      photos: undefined,
    },
    resolver: zodResolver(addEventGallerySchema),
  });

  if (!event) return <div>Loading...</div>;
  const onSubmit: SubmitHandler<addEventGalleryFields> = async (data) => {
    const formData = new FormData();
    console.log(data.photos);
    console.log();
    if (data.photos && data.photos.length) {
      Object.entries(data.photos).map(
        (photo: [string, unknown], index: number) => {
          formData.append(`photos[${index}]`, photo[1] as File);
        }
      );
    }
    console.log(formData);
    await axios
      .post(API_ENDPOINT + "event/upload/" + event?._Eid, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast("Sucessfully Updated!! 🥳");
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl py-5 my-5">
      <h1 className="font-semibold text-2xl mt-3 flex flex-wrap m-5">
        Add Event Gallery
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input {...register("photos")} type="file" accept="image/*" multiple />
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

export default AddPhotoGallery;
