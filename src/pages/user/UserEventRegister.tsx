import {
  userEventRegisterFormFields,
  userEventRegisterSchemas,
} from "@/schemas/schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "universal-cookie";
import useUser from "@/hooks/useUser";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import CardShimmer from "@/components/CardShimmer";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const UserEventRegister = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  useUser(token);

  const { state } = useLocation();
  const user = useSelector((store: RootState) => store.user.currentUser);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<userEventRegisterFormFields>({
    resolver: zodResolver(userEventRegisterSchemas),
  });
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<userEventRegisterFormFields> = async (data) => {
    const updatedData = {
      ...data,
      name: user?.name,
      email: user?.email,
      phoneno: user?.phone,
      rollno: user?.rollno,
      team: "false",
    };
    await axios
      .post(
        import.meta.env.VITE_API_ENDPOINT +
          "event/register/" +
          state.event._Eid,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        toast("Sucessfully Registered!! 🥳");
        navigate(-1);
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  if (!token)
    return <div className="text-5xl text-center">You need to login first</div>;
  if (!user) return <CardShimmer />;

  return (
    <div className="m-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl">Registering for {state.event.title}</h1>
      <div className="w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl my-5 text-center">Participant Details</h2>
        <div className="flex flex-col gap-y-3 justify-center">
          <Label>Name</Label>
          <Input
            value={user?.name}
            type="text"
            disabled
            placeholder="Enter Name"
          />

          <Label>Email</Label>
          <Input
            value={user?.email}
            type="email"
            disabled
            placeholder="Enter Email"
          />

          <Label>Phone No.</Label>
          <Input
            value={user?.phone}
            type="number"
            disabled
            placeholder="Enter Phone No."
          />

          <Label>Roll No.</Label>
          <Input
            value={user?.rollno}
            type="number"
            placeholder="Enter Roll No."
            disabled
          />
          {state.event.parameters ? (
            <form
              className="flex flex-col gap-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              {state.event.parameters.map(
                (
                  parameter: { name: string; description: string },
                  index: number
                ) => {
                  return (
                    <div key={uuidv4()} className="flex flex-col space-y-2">
                      <Label>{parameter.name}</Label>
                      <input
                        type="hidden"
                        {...register(`parameters.${index}.name`)}
                        value={parameter.name}
                      />
                      <Input
                        {...register(`parameters.${index}.description`)}
                        type="text"
                        placeholder={parameter.description}
                      />
                      {errors.parameters && (
                        <div className="text-red-500">
                          {errors.parameters.message}
                        </div>
                      )}
                    </div>
                  );
                }
              )}

              <Button disabled={isSubmitting} type="submit">
                Register
              </Button>
              {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button disabled={isSubmitting} type="submit" className="w-full">
                Register
              </Button>
              {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEventRegister;
