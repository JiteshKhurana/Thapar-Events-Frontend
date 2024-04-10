import ActiveEventCard from "./components/ActiveEventCard";
import SocietyDashBoardCard from "@/pages/society/components/SocietyDashBoardCard";

const SocietyDashboard: React.FC = () => {
  const currentDate = new Date().toDateString();
  return (
    <div className="border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="welcome flex justify-between items-center pt-5 px-[30px]">
        <div className="welcome flex flex-col">
          <span className="text  font-semibold  text-md">{currentDate}</span>
          <span className="flex flex-wrap gap-2 text  text-2xl">
            Welcome back
            <span className="text-4xl font-semibold">
              Creative Computing Society! ♥️
            </span>
          </span>
        </div>
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
