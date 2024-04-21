import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { addSocietyFields, addSocietySchema } from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const SuperAdminDashboardAddSociety = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<addSocietyFields>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(addSocietySchema),
  });

  const onSubmit: SubmitHandler<addSocietyFields> = async (data) => {
    const updatedData = {
      ...data,
      role: "admin",
    };
    await axios
      .post(API_ENDPOINT + "soc/register", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast("Society registered successfully!! 🥳");
        reset();
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };

  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-3 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-6">
          <div className="">
            <CardHeader className="m-0 px-0">
              <CardTitle className="text-xl">Add Society</CardTitle>
              <CardDescription>Register a new society</CardDescription>
            </CardHeader>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-1/2 space-y-3"
          >
            <Label>Society Email</Label>
            <Input
              type="text"
              placeholder="Society Email"
              {...register("email")}
            />

            <Button type="submit" disabled={isSubmitting}>
              Create Society
            </Button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardAddSociety;
