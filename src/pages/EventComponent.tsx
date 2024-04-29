import { useNavigate } from "react-router-dom";
import { Event } from "@/store/eventSlice";

const EventComponent = ({ event }: { event: Event }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(
          "/events/" +
            event.title.split(" ").join("-").toLowerCase() +
            "/" +
            event._Eid
        )
      }
      className="w-full hover:scale-110 transition-all duration-300 rounded-lg"
    >
      <div className="flex flex-col">
        <h2 className="flex justify-center items-center overflow-scroll no-scrollbar font-semibold text-md">
          {event.title}
        </h2>
      </div>
    </div>
  );
};

export default EventComponent;
