import { Button } from "@/components/ui/button";
import { BiPlus } from "react-icons/bi";
import { RegistrationsTable } from "./components/RegistrationsTable";

const ManageEventRegistrations = () => {
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="heading flex flex-wrap gap-3 p-6 mt-3">
        <span className="font-semibold text-2xl mr-5">Registrations</span>
        <Button className="flex items-center">
          Add registration
          <BiPlus className="text-xl" />
        </Button>
        <Button>Export to csv</Button>
      </div>
      <div className="searchbar p-7 flex flex-wrap items-center gap-3">
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
