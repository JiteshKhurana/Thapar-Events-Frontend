import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import Event from "@/store/eventSlice";

const EventComponent = ({ event }: any) => {
  const navigate = useNavigate();
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
        <CardTitle>{event.title}</CardTitle>
        <Avatar className="h-16 w-16">
          <AvatarImage
            className=""
            src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg"
          />
          <AvatarFallback>{event.title}</AvatarFallback>
        </Avatar>
        <CardDescription className="text-black">
          {event.soc_name}
        </CardDescription>
        <Button>Add to Google Calender</Button>
      </CardHeader>
    </Card>
  );
};

export default EventComponent;
