import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuperAdminDashboardAddSociety = () => {
  const {
    register,
    formState: { errors },
  } = useForm();

  console.log(errors);

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
          <form className="flex flex-col w-1/2 space-y-3">
            <span className="text-sm font-medium">Society Name</span>
            <Input
              type="text"
              placeholder="Society Name"
              {...register("Society Name", { required: true })}
            />

            <span className="text-sm font-medium">Society Email</span>
            <Input
              type="text"
              placeholder="Society Email"
              {...register("Society Email", { required: true })}
            />

            <Button>Create Society</Button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboardAddSociety;
