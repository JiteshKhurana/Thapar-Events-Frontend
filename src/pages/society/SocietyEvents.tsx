import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocietyEventCard from "./components/SocietyEventCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BiSearch } from "react-icons/bi";

const SocietyEvents: React.FC = () => {
  const societyEvents = useSelector(
    (store: RootState) => store.society.currentSocietyEvents
  );
  if (!societyEvents) return <h1>No Events to display</h1>;
  return (
    <div className="bg-white dark:bg-black border shadow-2xl flex flex-col w-[90%] px-3 md:w-[70%] rounded-xl pt-5 mt-5">
      <div className="welcome flex justify-start items-center pt-5 px-[30px]">
        <div className="your-events">
          <span className="text-2xl font-semibold">Your Events</span>
        </div>
      </div>

      <div className="eventList px-[30px] mt-[40px]">
        <div className="searchbar flex justify-start items-center">
          <Input
            className="w-[400px] rounded-full"
            placeholder="Search Events"
          />
          <Button className="sm:px-6 mx-2 rounded-full"> <span className="sm:hidden "><BiSearch/></span > <div className="sm:block hidden ">Search</div></Button>
        </div>
        <div className="event-list flex flex-col py-3">
          {societyEvents.map((event) => (
            <SocietyEventCard event={event} key={event._Eid} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocietyEvents;
