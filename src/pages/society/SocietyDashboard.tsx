import SocietyDashBoardCard from "@/pages/society/components/SocietyDashBoardCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { upcomingOrPast } from "@/lib/helper";
import SocietyEventCard from "./components/SocietyEventCard";

const SocietyDashboard: React.FC = () => {
  const currentDate = new Date().toDateString();

  const society = useSelector(
    (store: RootState) => store.society.currentSociety
  );
  const societyMetrics = useSelector(
    (store: RootState) => store.society.currentSocietyMetrics
  );
  const societyEvents = useSelector(
    (store: RootState) => store.society.currentSocietyEvents
  );
  if (!societyEvents) return <h1>No Events to display</h1>;
  return (
    <div className="bg-white dark:bg-black border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="welcome flex justify-between items-center pt-5 px-1 lg:px-5">
        <div className="welcome flex flex-col">
          <span className="text  font-semibold  text-md">{currentDate}</span>
          <span className="flex flex-wrap gap-2 text  text-2xl">
            Welcome back
            <span className="text-4xl font-semibold">{society?.name}! ♥️</span>
          </span>
        </div>
      </div>
      <div className="px-1 lg:px-5 flex flex-col mt-5">
        <span className="text-2xl">Your Stats</span>
        <div className="flex flex-wrap w-full mt-4 justify-between">
          <SocietyDashBoardCard
            title={"Total Events"}
            value={societyMetrics?.totalEvents}
          />
          <SocietyDashBoardCard
            title={"Upcoming Events"}
            value={societyMetrics?.upcomingEvents}
          />
          <SocietyDashBoardCard
            title={"Team Members"}
            value={societyMetrics?.teamMembers}
          />
        </div>
      </div>
      <div className="active px-1 lg:px-5 mt-[30px]">
        <span className="active text-xl font-semibold">Upcoming Events</span>
        <div className="active-event-list flex flex-col py-3">
          {societyEvents
            ?.filter((event) => upcomingOrPast(event.end_date))
            .map((event) => (
              <SocietyEventCard event={event} key={event._Eid} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SocietyDashboard;
