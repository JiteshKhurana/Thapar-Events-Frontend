import { Button } from "@/components/ui/button";
import { BiCalendarEvent } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Event } from "@/store/eventSlice";
import { timeConverter, upcomingOrPast } from "@/lib/helper";

const SuperadminSocietyEventCard = ({ event }: { event: Event }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="event-card my-2 flex flex-wrap gap-3 p-3 pr-6  border shadow-md rounded-xl justify-between overflow-hidden">
        <div className="left-data flex">
          <div className="info flex flex-col justify-between mx-4">
            <div className="event-name font-semibold text-2xl">
              {event.title}
            </div>
            <div className="det flex flex-col">
              <span className="">{event.event_mode}</span>
              <span className="flex items-center">
                <BiCalendarEvent className="text-xl" />{" "}
                {timeConverter(event.start_date, false)} :
                {timeConverter(event.end_date, false)}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-auto right-data flex flex-col min-h-full items-center justify-around gap-3">
          <Button
            className="border w-full bg-transparent hover:bg-black text-black hover:text-white dark:text-white dark:hover:text-black dark:hover:bg-white "
            onClick={() => {
              navigate("/eventdashboard/" + event._Eid);
            }}
          >
            Event Dashboard
          </Button>
          <div className="flex">
            <span>Status: </span>
            {upcomingOrPast(event.end_date) ? (
              <span className="text-green-500 font-bold ml-1">Upcoming</span>
            ) : (
              <span className="text-red-500 font-bold ml-1">Past</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperadminSocietyEventCard;
