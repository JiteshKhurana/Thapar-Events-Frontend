import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditUser: React.FC = () => {
  return (
    <div className="mx-96 flex flex-col space-y-5">
      <h1>Edit Your Profile</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input disabled type="text" placeholder="Name" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input disabled type="email" placeholder="Email" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="phone">Phone No.</Label>
        <Input type="number" placeholder="Phone No" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="roll">Roll No.</Label>
        <Input type="number" placeholder="Roll No" />
      </div>
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
            <SelectItem value="2027">CSE</SelectItem>
            <SelectItem value="2026">COE</SelectItem>
            <SelectItem value="2025">ENC</SelectItem>
            <SelectItem value="2024">MECH</SelectItem>
            <SelectItem value="2023">CHE</SelectItem>
            <SelectItem value="2023">BIO</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EditUser;
