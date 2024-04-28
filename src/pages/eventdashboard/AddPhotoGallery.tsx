import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    reset,
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
    if (data.photos && data.photos.length) {
      for (let x = 0; x < data.photos.length; x++) {
        formData.append("photos", data.photos[x]);
      }
    }
    await axios
      .post(
        import.meta.env.VITE_API_ENDPOINT + "event/upload/" + event?._Eid,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast("Sucessfully Updated!! 🥳");
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
      <h1 className="font-semibold text-2xl mt-3 flex flex-wrap m-5">
        Delete Photos
      </h1>
      {event.photo_gallery &&
        event.photo_gallery.map((photo, index) => {
          return (
            <div key={index} className="flex flex-col space-y-5 items-center">
              <img
                src={photo}
                alt="photo"
                className="w-1/2 h-1/2 object-cover rounded-lg"
              />
              <Button
                className="w-1/2"
                onClick={async () => {
                  await axios
                    .delete(
                      import.meta.env.VITE_API_ENDPOINT +
                        "event/photo/delete/" +
                        event?._Eid,
                      {
                        params: {
                          photoURL: photo,
                        },
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    )
                    .then(() => {
                      toast("Sucessfully Deleted!! 🥳");
                    })
                    .catch((error) =>
                      setError("root", {
                        message: error.message,
                      })
                    );
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
    </div>
  );
};

export default AddPhotoGallery;
