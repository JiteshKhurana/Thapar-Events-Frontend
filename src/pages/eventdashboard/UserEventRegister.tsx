import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  userEventRegisterSchemas,
  EventRegisterFormFields,
} from "@/schemas/schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import useUser from "@/hooks/useUser";

const UserEventRegister = () => {
  useUser();
  const user = useSelector((store: RootState) => store.user.currentUser);
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const form = useForm<EventRegisterFormFields>({
    resolver: zodResolver(userEventRegisterSchemas),
    defaultValues: {
      name: "",
      email: "",
      phoneno: "",
      rollno: "",
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const [success, setSuccess] = useState(false);

  const onSubmit: SubmitHandler<EventRegisterFormFields> = async (
    data: EventRegisterFormFields
  ) => {
    await axios
      .post(
        "https://thapar-event-management-system-production.up.railway.app/event/register/660dbbaf6d588f6a42a1065e",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  if (!token) return <h1>You Need to Login First</h1>;
  return (
    <div className="m-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl">Registering for Escalde</h1>
      <div className="w-full">
        <h2 className="text-2xl my-5">Participant Details</h2>
        <div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  value={user?.name || ""}
                  disabled
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={user?.email || ""}
                  disabled
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="phone">Phone No.</Label>
                <Input
                  value={user?.phone || ""}
                  disabled
                  type="text"
                  placeholder="Phone No."
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="phone">Roll No.</Label>
                <Input
                  value={user?.rollno || ""}
                  disabled
                  type="text"
                  placeholder="Roll No."
                />
              </div>
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Loading" : "Submit"}
              </Button>
              {success && (
                <div>
                  <p className="text-green-500">Sucessfully Registered 🥳</p>
                  <Link to={"/events"}>Go Back</Link>
                </div>
              )}
              {errors.root && (
                <p className="text-red-500">{errors.root.message}</p>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserEventRegister;
