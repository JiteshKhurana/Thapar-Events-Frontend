import { Button } from "@/components/ui/button";
import { BiCalendarEvent } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Event } from "@/store/eventSlice";
import { timeConverter, upcomingOrPast } from "@/lib/helper";

const SocietyEventCard = ({ event }: { event: Event }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="event-card my-2 flex p-3 pr-6 border-[1px] border-gray-400 rounded-xl justify-between">
        <div className="left-data flex">
          <div
            className="active-event-img w-[100px] h-[100px] rounded-md "
            style={{
              backgroundImage: event.image,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="info flex flex-col justify-between mx-4">
            <div className="event-name font-semibold text-2xl">
              {event.title}
            </div>
            <div className="det flex flex-col">
              <span className="">{event.event_mode}</span>
              <span className="flex items-center">
                <BiCalendarEvent className="text-xl" />{" "}
                {timeConverter(event.start_date, false)} :{" "}
                {timeConverter(event.end_date, false)}
              </span>
            </div>
          </div>
        </div>
        <div className="right-data flex flex-col min-h-full items-center justify-around">
          <Button onClick={() => navigate("/eventdashboard")}>
            Event Dashboard
          </Button>
          <div className="flex">
            <span>Status: </span>
            {upcomingOrPast(event.start_date) ? (
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

export default SocietyEventCard;
