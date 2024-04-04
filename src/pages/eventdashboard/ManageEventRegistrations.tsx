import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { RegistrationsTable } from "./components/RegistrationsTable";

("use client");

const ManageEventRegistrations = () => {
  return (
    <div className="w-full min-h-[100vh] bg-gray-0">
      <div className="heading flex flex-wrap gap-3 p-6 mt-3">
        <span className="font-semibold text-2xl mr-5">Registrations</span>
        <Button className="flex items-center">
          Add registration
          <BiPlus className="text-xl" />
        </Button>
        <Button>Export to csv</Button>
      </div>
      <div className="searchbar p-7 flex flex-wrap items-center gap-3">
        {/* <Input placeholder="Search Registrations "
                className="max-w-[600px] rounded-full"
            ></Input>
            <Button className="flex gap-2 items-center rounded-full">Search <BiSearch className="text-xl"></BiSearch></Button> */}
        <span>
          Total Registrations: <span className="font-semibold">234</span>
        </span>
      </div>

      <div className="px-7">
        <RegistrationsTable />
      </div>
    </div>
  );
};

export default ManageEventRegistrations;
