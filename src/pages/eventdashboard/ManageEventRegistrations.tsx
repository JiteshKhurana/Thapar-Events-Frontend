import { Button } from "@/components/ui/button";
import { RegistrationsTable } from "./components/RegistrationsTable";

const ManageEventRegistrations = () => {
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 m-5">
      <div className="heading flex flex-wrap mt-3 justify-between m-5">
        <h1 className="font-semibold text-2xl">Registrations</h1>
        <Button>Export to csv</Button>
      </div>
      <h2 className="ml-5 text-xl">Total Registrations: 234</h2>

      <div className="px-7">
        <RegistrationsTable />
      </div>
    </div>
  );
};

export default ManageEventRegistrations;
