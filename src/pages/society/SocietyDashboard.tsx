import { Button } from "@/components/ui/button";
import ActiveEventCard from "./components/ActiveEventCard";
import { BiPlus } from "react-icons/bi";


const SocietyDashboard: React.FC = () => {
  return (
    <div className="w-full min-h-full  flex flex-col ">
      <div className="welcome flex justify-between items-center  pt-5 px-[30px]">
        <div className="society-greeting">
          <span className="font-light text-xl text-gray-600">
            Welcome Back,
          </span>{" "}
          <br />{" "}
          <span className="text-3xl font-semibold">
            Creative Computing Society
          </span>
        </div>
        <Button className="bg-[#265073] p-6 mr-8">
          <BiPlus className="text-xl" />
          Create New Event
        </Button>
      </div>
      <div className="stats px-[30px] mt-7 text-[20px] font-semibold flex-col">
        <span className="text-xl">Your Stats</span>
        <div className="flex flex-wrap gap-3 w-full mt-4">
          <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
            <span className="font-light text-lg text-gray-600">
              Total Events
            </span>
            <span className="font-semibold text-3xl">3</span>
          </div>
          <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
            <span className="font-light text-lg text-gray-600">
              Total Participation
            </span>
            <span className="font-semibold text-3xl">672</span>
          </div>
          <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
            <span className="font-light text-lg text-gray-600">
              Upcoming Events
            </span>
            <span className="font-semibold text-3xl">3</span>
          </div>
          <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
            <span className="font-light text-lg text-gray-600">
              Team Members
            </span>
            <span className="font-semibold text-3xl">3</span>
          </div>
          <div className="statsBox dark:bg-slate-900 mx-5 flex flex-col shadow-2xl bg-white rounded-2xl w-[200px] h-[100px] justify-center items-center">
            <span className="font-light text-lg text-gray-600">
              Total Events
            </span>
            <span className="font-semibold text-3xl">3</span>
          </div>
        </div>
      </div>
      <div className="active px-[30px] mt-[30px]">
        <span className="active text-xl font-semibold">
          Active and Upcoming Events
        </span>
        <div className="active-event-list flex flex-col py-3">
          <ActiveEventCard />
          <ActiveEventCard />
          <ActiveEventCard />

        </div>
      </div>
    </div>
  );
};

export default SocietyDashboard;
