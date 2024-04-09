import {
  // Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      className="w-full hover:scale-105 transition-all duration-300 rounded-lg"
    >
      <CardHeader className="flex flex-col ">
        <CardTitle className="flex justify-center items-center overflow-scroll no-scrollbar font-semibold text-xl">{event.title}</CardTitle>
        <CardDescription className="text-sm text-black text-center">
          {event.soc_name}
        </CardDescription>
      </CardHeader>
    </div>
  );
};

export default EventComponent;
