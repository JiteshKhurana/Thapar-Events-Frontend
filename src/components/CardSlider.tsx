import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BiCalendar } from "react-icons/bi";
import { Badge } from "./ui/badge";
import { Event } from "@/store/eventSlice";
import { timeConverter } from "@/lib/helper";
import { useNavigate } from "react-router-dom";

type FCProps = {
  title: string;
  apply: boolean;
  itemsToMap: Event[];
};

const CardSlider: React.FC<FCProps> = ({ title, apply, itemsToMap }) => {
  const navigate = useNavigate();
  return (
    <div className="my-5">
      <div className="flex items-center justify-between my-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button>See All</Button>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar gap-3">
        {itemsToMap?.map((event) => (
          <div
            key={event._Eid}
            className="min-w-[350px] flex flex-col  mb-3 overflow-hidden border rounded-md"
          >
            <div className="event-img w-[350px] h-[175px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')] bg-cover"></div>
            <CardHeader className="flex flex-row gap-5">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{event.soc_name}</CardDescription>
                <CardDescription className="flex items-center gap-2">
                  <BiCalendar className="text-black dark:text-white" />
                  {timeConverter(event.start_date, false)}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {event.hashtags &&
                event.hashtags.map((hashtag) => (
                  <Badge key={uuidv4()} variant="outline">
                    #{hashtag}
                  </Badge>
                ))}
            </CardContent>
            {apply ? (
              <CardFooter className="justify-between">
                <Button variant={"outline"} className="w-2/5">
                  Preview
                </Button>
                <Button className="w-2/5">Apply</Button>
              </CardFooter>
            ) : (
              <CardFooter className="justify-between">
                <Button
                  onClick={() =>
                    navigate(
                      "/events/" +
                        event.title.split(" ").join("-").toLowerCase() +
                        "/" +
                        event._Eid
                    )
                  }
                  variant={"outline"}
                  className="w-full"
                >
                  Preview
                </Button>
              </CardFooter>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
