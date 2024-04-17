import { Button } from "@/components/ui/button";
// import { BiEnvelope, BiLogoLinkedinSquare, BiPlus } from "react-icons/bi";
// import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { editSocietyFormFields, editSocietySchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import Cookies from "universal-cookie";
import { useState } from "react";
import { toast } from "sonner";
import { editSociety } from "@/store/societyProfileSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EditSocietyProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const society = useSelector(
    (store: RootState) => store.society.currentSociety
  );
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<editSocietyFormFields>({
    defaultValues: {
      name: society?.name,
      about: society?.about,
      members: [
        {
          name: "",
          email: "",
          position: "",
          instagram: "",
          linkedin: "",
        },
      ],
      faculty: [
        {
          name: "",
          email: "",
          position: "",
          linkedin: "",
        },
      ],
    },
    resolver: zodResolver(editSocietySchema),
  });

  if (success) {
    toast("Sucessfully Updated!! 🥳");
    setSuccess(false);
  }

  const onSubmit: SubmitHandler<editSocietyFormFields> = async (
    data: editSocietyFormFields
  ) => {
    await axios
      .post(API_ENDPOINT + "soc/update/" + society?.email, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSuccess(true);
        dispatch(editSociety(res.data));
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  const fieldArray1 = useFieldArray({
    name: "members",
    control,
  });
  const fieldArray2 = useFieldArray({
    name: "faculty",
    control,
  });
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="heading flex items-center gap-4 py-2">
        <span className="text-3xl font-semibold">Edit your public profile</span>
      </div>

      <form className="flex flex-col gap-y-3" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
        <label>About</label>
        <textarea
          {...register("about")}
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Write about your society"
        ></textarea>
        {errors.about && (
          <div className="text-red-500">{errors.about.message}</div>
        )}

        {/* Team Members */}
        <div>
          <Label>Team Members</Label>
          <div className="flex flex-col space-y-5">
            {fieldArray1.fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-5 flex flex-row justify-between space-x-5"
              >
                <div className="w-full my-3">
                  <Label>Member {index + 1}</Label>
                  <div className="space-y-2">
                    <Input
                      {...register(`members.${index}.name` as const)}
                      type="text"
                      placeholder={`Name of Member ${index + 1}`}
                    />
                    <Input
                      type="email"
                      {...register(`members.${index}.email` as const)}
                      placeholder={`Email of Member ${index + 1}`}
                    />
                    <Input
                      {...register(`members.${index}.position` as const)}
                      type="text"
                      placeholder={`Position of Member ${index + 1}`}
                    />
                    <Input
                      type="text"
                      {...register(`members.${index}.instagram` as const)}
                      placeholder={`Instagram of Member ${index + 1}`}
                    />
                    <Input
                      type="text"
                      {...register(`members.${index}.linkedin` as const)}
                      placeholder={`Linkedin of Member ${index + 1}`}
                    />
                  </div>
                </div>
                <Button
                  className="my-auto"
                  type="button"
                  onClick={() => fieldArray1.remove(index)}
                >
                  Remove Member
                </Button>
              </div>
            ))}
            <Button
              className="w-1/4"
              type="button"
              onClick={() =>
                fieldArray1.append({
                  name: "",
                  email: "",
                  position: "",
                  instagram: "",
                  linkedin: "",
                })
              }
            >
              Add New Member
            </Button>
          </div>
          {errors.members && (
            <div className="text-red-500">{errors.members.message}</div>
          )}
        </div>

        {/* Faculty Members */}
        <div>
          <Label>Faculty Members</Label>
          <div className="flex flex-col space-y-5">
            {fieldArray2.fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-5 flex flex-row justify-between space-x-5"
              >
                <div className="w-full my-3">
                  <Label>Faculty {index + 1}</Label>
                  <div className="space-y-2">
                    <Input
                      {...register(`faculty.${index}.name` as const)}
                      type="text"
                      placeholder={`Name of Faculty ${index + 1}`}
                    />
                    <Input
                      type="email"
                      {...register(`faculty.${index}.email` as const)}
                      placeholder={`Email of Faculty ${index + 1}`}
                    />
                    <Input
                      {...register(`faculty.${index}.position` as const)}
                      type="text"
                      placeholder={`Position of Faculty ${index + 1}`}
                    />
                    <Input
                      type="text"
                      {...register(`faculty.${index}.linkedin` as const)}
                      placeholder={`Linkedin of Faculty ${index + 1}`}
                    />
                  </div>
                </div>
                <Button
                  className="my-auto"
                  type="button"
                  onClick={() => fieldArray2.remove(index)}
                >
                  Remove Faculty
                </Button>
              </div>
            ))}
            <Button
              className="w-1/4"
              type="button"
              onClick={() =>
                fieldArray2.append({
                  name: "",
                  email: "",
                  position: "",
                  linkedin: "",
                })
              }
            >
              Add New Faculty
            </Button>
          </div>
          {errors.faculty && (
            <div className="text-red-500">{errors.faculty.message}</div>
          )}
        </div>

        <div className="savechanges w-full flex justify-between items-center px-10 py-5">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="rounded-sm p-6 border-2 hover:bg-gray-300">
                Cancel
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Any changes done will be
                  discarded.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => navigate("/society")}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="rounded-sm p-6"
          >
            {isSubmitting ? "Loading..." : "Save Changes"}
          </Button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditSocietyProfile;
