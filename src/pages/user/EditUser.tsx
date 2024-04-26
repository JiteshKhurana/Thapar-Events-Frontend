import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { editUserSchema, FormFields } from "../../schemas/schema";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "universal-cookie";
import { editUser } from "@/store/UserSlice";
import { API_ENDPOINT, BATCHES, BRANCHES } from "@/lib/constants";
import { toast } from "sonner";

const EditUser: React.FC = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user = useSelector((store: RootState) => store.user.currentUser);
  const form = useForm<FormFields>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      phone: user?.phone,
      rollNo: user?.rollno,
      branch: user?.branch,
      batch: user?.batch,
    },
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const [success, setSuccess] = useState(false);
  if (success) {
    toast("Sucessfully Updated!! 🥳");
    setSuccess(false);
  }

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    await axios
      .post(API_ENDPOINT + "users/update/" + user?.email, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setSuccess(true);
        dispatch(editUser(res.data.user));
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };
  return (
    <div className="border shadow-2xl flex flex-col w-full md:w-[70%]  rounded-xl pt-5 px-6 mt-5">
      <span className="text-3xl my-5 font-semibold">Edit Your Profile</span>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mx-5"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input value={user?.name} disabled type="text" placeholder="Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              value={user?.email}
              disabled
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PhoneNo.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      type="number"
                      placeholder="Phone No"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="rollNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roll No.</FormLabel>
                  <FormControl>
                    <Input
                      id="rollNo"
                      {...field}
                      type="number"
                      placeholder="Roll No"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Batch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BATCHES.map((batch, index) => (
                        <SelectItem key={index} value={batch}>
                          {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BRANCHES.map((branch, index) => (
                        <SelectItem key={index} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="mt-5">
              {isSubmitting ? "Loading" : "Submit"}
            </Button>
          </div>
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </form>
      </Form>
    </div>
  );
};

export default EditUser;
