import { SubmitHandler, useForm } from "react-hook-form";
import { userFeedbackSchema, userFeedbackFields } from "../schemas/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import useUser from "@/hooks/useUser";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "sonner";

const FeedbackForm = () => {
  useUser();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user = useSelector((state: RootState) => state.user.currentUser);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userFeedbackFields>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(userFeedbackSchema),
  });

  const onSubmit: SubmitHandler<userFeedbackFields> = async (data) => {
    const updatedData = {
      ...data,
      name: user?.name,
      email: user?.email,
      contact: user?.phone,
    };
    console.log(updatedData);
    await axios
      .post(
        "https://thapar-event-management-system-production.up.railway.app/feedback",
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast(res.data + "🥳");
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };

  return (
    <div className="m-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl">Report Bugs/FeedBack</h1>
      <div className="w-1/2 flex flex-col justify-center">
        <div className="flex flex-col gap-y-3 justify-center">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" disabled defaultValue={user?.name} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" disabled defaultValue={user?.email} />
          </div>
          <div>
            <Label htmlFor="phoneNo.">Phone No.</Label>
            <Input type="number" disabled defaultValue={user?.phone} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" {...register("message")} />
              {errors.message && (
                <div className="text-red-500">{errors.message.message}</div>
              )}
            </div>

            <Button
              className="w-full my-3"
              disabled={isSubmitting}
              type="submit"
            >
              Submit
            </Button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
