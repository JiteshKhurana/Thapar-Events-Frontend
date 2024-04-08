import { Button } from "@/components/ui/button";
import ActiveEventCard from "./components/ActiveEventCard";
import { BiPlus } from "react-icons/bi";
import SocietyDashBoardCard from "@/pages/society/components/SocietyDashBoardCard";
import { useNavigate } from "react-router-dom";

const SocietyDashboard: React.FC = () => {
  const currentDate = new Date().toDateString();
  const navigate = useNavigate();
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="welcome flex justify-between items-center pt-5 px-[30px]">
        <div className="welcome flex flex-col">
          <span className="text text-gray-500 font-semibold dark:text-gray-200 text-md">
            {currentDate}
          </span>
          <span className="flex flex-wrap gap-2 text text-gray-700 dark:text-gray-400 text-2xl">
            Welcome back
            <span className="text-black dark:text-white text-4xl font-semibold">
              Creative Computing Society! ♥️
            </span>
          </span>
        </div>
        <Button
          onClick={() => navigate("/society/createevent")}
          className="mr-8"
        >
          <BiPlus className="text-xl" />
          Create New Event
        </Button>
      </div>
      <div className="px-[30px] flex flex-col mt-5">
        <span className="text-2xl">Your Stats</span>
        <div className="flex flex-wrap w-full mt-4 justify-between">
          <SocietyDashBoardCard title={"Total Events"} value={10} />
          <SocietyDashBoardCard title={"Total Participation"} value={672} />
          <SocietyDashBoardCard title={"Upcoming Events"} value={3} />
          <SocietyDashBoardCard title={"Team Members"} value={10} />
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
