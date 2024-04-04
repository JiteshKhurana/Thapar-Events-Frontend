import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { editUserSchema, FormFields } from "../schemas/schema";
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

  const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
    await axios
      .post(
        "https://thapar-event-management-system-production.up.railway.app/users/update/" +
          user?.email,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      )
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
    <div className="col-span-9 mx-40">
      <h1 className="text-3xl my-5">Edit Your Profile</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Batch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
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
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="COE">COE</SelectItem>
                      <SelectItem value="ENC">ENC</SelectItem>
                      <SelectItem value="MECH">MECH</SelectItem>
                      <SelectItem value="CHE">CHE</SelectItem>
                      <SelectItem value="BIO">BIO</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading" : "Submit"}
          </Button>
          {success && <p className="text-green-500">Sucessfully Updated 🥳</p>}
          {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        </form>
      </Form>
    </div>
  );
};

export default EditUser;
