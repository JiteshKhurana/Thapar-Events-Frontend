import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/index";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const onSubmit = () => {
  // console.log(values);
  console.log("Submitted");
  // actions.resetForm();
};

const EditUser: React.FC = () => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      phoneNo: 0,
      rollNo: 0,
      batch: "",
      branch: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });
  return (
    <div className="mx-96">
      <h1 className="my-10">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col space-y-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input disabled type="text" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input disabled type="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phoneNo">Phone No.</Label>
          <Input
            id="phoneNo"
            value={values.phoneNo}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Phone No"
          />
        </div>
        {errors.phoneNo && touched.phoneNo && (
          <p className="error">{errors.phoneNo}</p>
        )}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="rollNo">Roll No.</Label>
          <Input
            id="rollNo"
            value={values.rollNo}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="Roll No"
          />
        </div>
        {errors.rollNo && touched.rollNo && (
          <p className="error">{errors.rollNo}</p>
        )}
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select your Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Batch</SelectLabel>
              <SelectItem value="2027">2027</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select your Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Branch</SelectLabel>
              <SelectItem value="CSE">CSE</SelectItem>
              <SelectItem value="COE">COE</SelectItem>
              <SelectItem value="ENC">ENC</SelectItem>
              <SelectItem value="MECH">MECH</SelectItem>
              <SelectItem value="CHE">CHE</SelectItem>
              <SelectItem value="BIO">BIO</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
