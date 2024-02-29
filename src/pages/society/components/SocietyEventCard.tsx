import { Button } from "@/components/ui/button";
import { BiCalendarEvent } from "react-icons/bi";

const SocietyEventCard: React.FC = () => {
  return (
    <div>
      <div className="event-card my-2 flex p-3 pr-6 w-[80%] border-[1px] border-gray-400 rounded-xl justify-between">
        <div className="left-data flex">
          <div
            className="active-event-img w-[100px] h-[100px] rounded-md "
            style={{
              backgroundImage:
                "url('https://www.ccstiet.com/media/events/Code_Strike/images/codestrike_no7fba.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="info flex flex-col justify-between mx-4">
            <div className="event-name font-semibold text-2xl">CodeStrike</div>
            <div className="det flex flex-col text-gray-800">
              <span className="">Coding Competition</span>
              <span className="flex items-center">
                <BiCalendarEvent className="text-xl" /> 12-02-2024 : 14-02-2024
              </span>
            </div>
          </div>
        </div>
        <div className="right-data flex flex-col min-h-full items-center justify-around">
          <Button className="bg-[#265073] ">Event Dashboard</Button>
          <div className="flex">
            <span>Status: </span>
            <span className="text-green-800 font-bold ml-1">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyEventCard;
