import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  editSocietyBySuperadminFormFields,
  editSocietyBySuperadminSchema,
} from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const SuperAdminDashboardEditSocietyProfile = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const { state } = useLocation();
  console.log(state.data.email);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm<editSocietyBySuperadminFormFields>({
    defaultValues: {
      name: state.data.name,
      social_media: state.social_media,
      faculty: state.data.faculty,
    },
    resolver: zodResolver(editSocietyBySuperadminSchema),
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<editSocietyBySuperadminFormFields> = async (
    data
  ) => {
    try {
      await axios
        .post(API_ENDPOINT + "soc/update/" + state.data.email, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast("Society Updated successfully!! 🥳");
          reset();
          navigate(-1);
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data);
      } else {
        toast("An error occurred");
      }
    }
  };
  const fieldArray1 = useFieldArray({
    name: "faculty",
    control,
  });

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
          <div>
            <CardHeader className="m-0 px-0">
              <CardTitle className="text-xl">Edit Society</CardTitle>
              <CardDescription>Edit society Profile</CardDescription>
            </CardHeader>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-1/2 space-y-3"
          >
            <Label>Society Name</Label>
            <Input
              type="text"
              placeholder="Society Name"
              {...register("name")}
            />

            <div>
              <Label htmlFor="social_media">Social Media Handles</Label>
              <div className="flex gap-2">
                <div>
                  <Input
                    className="w-full"
                    type="text"
                    {...register("social_media.Instagram")}
                    placeholder="Instagram"
                  />
                  {errors.social_media?.Instagram && (
                    <div className="text-red-500">
                      {errors.social_media.Instagram.message}
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    className="w-full max-w-[400px]"
                    type="text"
                    {...register("social_media.Facebook")}
                    placeholder="Facebook"
                  />
                  {errors.social_media?.Facebook && (
                    <div className="text-red-500">
                      {errors.social_media.Facebook.message}
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    className="w-full max-w-[400px]"
                    type="text"
                    {...register("social_media.Youtube")}
                    placeholder="Youtube"
                  />
                  {errors.social_media?.Youtube && (
                    <div className="text-red-500">
                      {errors.social_media.Youtube.message}
                    </div>
                  )}
                </div>
                <div>
                  <Input
                    className="w-full max-w-[400px]"
                    type="text"
                    {...register("social_media.OfficialWebsite")}
                    placeholder="Official Website"
                  />
                  {errors.social_media?.OfficialWebsite && (
                    <div className="text-red-500">
                      {errors.social_media.OfficialWebsite.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Faculty Members */}
            <div>
              <Label>Faculty Members</Label>
              <div className="flex flex-col space-y-5">
                {fieldArray1.fields.map((field, index) => (
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
                      onClick={() => fieldArray1.remove(index)}
                    >
                      Remove Faculty
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
            <Button type="submit" disabled={isSubmitting}>
              Edit Society
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardEditSocietyProfile;
