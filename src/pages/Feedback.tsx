import { SubmitHandler, useForm } from "react-hook-form";
import { userFeedbackSchema, userFeedbackFields } from "../schemas/schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { LuGithub, LuInstagram, LuLinkedin, LuMail } from "react-icons/lu";
import { TEAM } from "@/lib/constants";
import { v4 as uuidv4 } from "uuid";

const FeedbackForm = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
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
  if (!token)
    return <div className="text-5xl text-center">You need to login first</div>;
  const onSubmit: SubmitHandler<userFeedbackFields> = async (data) => {
    const updatedData = {
      ...data,
      name: name,
      email: email,
    };
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
    <div className="m-3 sm:m-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold">Report Bugs/FeedBack</h1>
      <div className="w-full px-5 lg:px-[20vw] flex flex-col justify-center">
        <div className="flex flex-col gap-y-3 justify-center">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input type="text" disabled defaultValue={name ?? ""} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" disabled defaultValue={email ?? ""} />
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
      <h2 className="text-2xl font-semibold my-8">Our Team</h2>
      <div className="flex flex-wrap justify-center gap-5 dark:text-white">
        {TEAM.map((teamMember) => (
          <div
            key={uuidv4()}
            className="hover:scale-105 transition-all duration-300 flex flex-col justify-center w-full sm:w-[250px] p-6 shadow-xl border rounded-xl  dark:bg-gray-900  "
          >
            <img
              src={teamMember.image}
              alt=""
              className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square"
            />
            <div className="space-y-4 text-center divide-y dark:divide-gray-300">
              <div className="my-2 space-y-1">
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {teamMember.name}
                </h2>
                <p className="px-5 text-xs sm:text-base ">
                  {teamMember.role}
                </p>
              </div>
              <div className="flex justify-center pt-2 space-x-4 align-center">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={teamMember.github}
                  aria-label="GitHub"
                  className="p-2 rounded-md  hover:dark:text-violet-600"
                >
                  <LuGithub />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={teamMember.instagram}
                  aria-label="instagram"
                  className="p-2 rounded-md  hover:dark:text-violet-600"
                >
                  <LuInstagram />
                </a>
                <a
                  rel="noopener noreferrer"
                  href={teamMember.linkedin}
                  aria-label="linkedin"
                  target="_blank"
                  className="p-2 rounded-md  hover:dark:text-violet-600"
                >
                  <LuLinkedin />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"mailto:" + teamMember.email}
                  aria-label="Email"
                  className="p-2 rounded-md  hover:dark:text-violet-600"
                >
                  <LuMail />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackForm;
