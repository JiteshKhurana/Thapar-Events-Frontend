import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Event } from "@/store/eventSlice";

const EventComponent = ({ event }: { event: Event }) => {
  const navigate = useNavigate();
  console.log(event);
  return (
    <Card
      onClick={() =>
        navigate(
          "/events/" +
            event.title.split(" ").join("-").toLowerCase() +
            "/" +
            event._Eid
        )
      }
      className="w-full hover:scale-105 transition-all duration-300 rounded-none bg-red-500"
    >
      <CardHeader className="flex flex-col space-x-5 ">
        <CardTitle className="text-center text-2xl">{event.title}</CardTitle>
        <CardDescription className="text-black text-center">
          {event.soc_name}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default EventComponent;
