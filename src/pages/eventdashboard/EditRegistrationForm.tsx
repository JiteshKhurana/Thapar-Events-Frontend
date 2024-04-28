import {
  userEventRegisterSchemas,
  userEventRegisterFormFields,
} from "@/schemas/schema";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { API_ENDPOINT } from "@/lib/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { editCurrentEvent } from "@/store/eventDashboardSlice";
import CardShimmer from "@/components/CardShimmer";

const EditRegistrationForm = () => {
  const [success, setSuccess] = useState(false);
  if (success) {
    toast("Sucessfully Updated!! 🥳");
    setSuccess(false);
  }
  const dispatch = useDispatch();
  const event = useSelector(
    (store: RootState) => store.eventDashboard.currentEvent
  );
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<userEventRegisterFormFields>({
    defaultValues: {
      parameters: event?.parameters,
    },
    resolver: zodResolver(userEventRegisterSchemas),
  });

  const fieldArray = useFieldArray({
    name: "parameters",
    control,
  });

  useEffect(() => {
    const unloadCallback = (event: {
      preventDefault: () => void;
      returnValue: string;
    }) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  if (!event)
    return (
      <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl py-5 my-5">
        <CardShimmer />
      </div>
    );

  const onSubmit: SubmitHandler<userEventRegisterFormFields> = async (data) => {
    await axios
      .post(API_ENDPOINT + "event/update/" + event._Eid, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSuccess(true);
        dispatch(editCurrentEvent(res.data));
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-semibold text-2xl">Edit Registration Form</h1>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Extra Parameters</Label>
          <div className="flex flex-col space-y-5">
            {fieldArray.fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 space-x-5">
                <div className="col-span-10 space-y-2">
                  <Input
                    {...register(`parameters.${index}.name` as const)}
                    type="text"
                    placeholder={`Parameters ${index + 1} Name e.g height`}
                  />
                  <Textarea
                    {...register(`parameters.${index}.description` as const)}
                    placeholder={`Description of Parameter ${
                      index + 1
                    } e.g height of the student in cm`}
                  />
                </div>
                <Button
                  className="col-span-2 my-auto"
                  type="button"
                  onClick={() => fieldArray.remove(index)}
                >
                  Remove Parameter
                </Button>
              </div>
            ))}
            <Button
              className="w-1/4"
              type="button"
              onClick={() =>
                fieldArray.append({
                  name: "",
                  description: "",
                })
              }
            >
              Add New Parameter
            </Button>
          </div>
          {errors.parameters && (
            <div className="text-red-500">{errors.parameters.message}</div>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="py-3 px-10 w-full"
        >
          {isSubmitting ? "Loading..." : "Save Changes"}
        </Button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default EditRegistrationForm;
