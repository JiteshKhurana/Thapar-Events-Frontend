import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import Event from "../assets/event.png";
import {
  // Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BiCalendar } from "react-icons/bi";

type FCProps = { title: string; apply: boolean };

const CardSlider: React.FC<FCProps> = ({ title, apply }) => {
  return (
    <div className="my-5">
      <div className="flex items-center justify-between my-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button>See All</Button>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar gap-3">
        {Array(12)
          .fill(0)
          .map(() => (
            <div className="min-w-[350px] flex flex-col  mb-3 overflow-hidden border rounded-md">
              {/* <img src={Event} className="h-44" /> */}
              <div className="event-img w-[350px] h-[175px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')] bg-cover"></div>
              <CardHeader className="flex flex-row gap-5">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg"/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Escalade</CardTitle>
                  <CardDescription>Creative Computing Society</CardDescription>
                  <CardDescription className="flex items-center gap-2"><BiCalendar className="text-black dark:text-white"/>24-04-2024</CardDescription>
                </div>
              </CardHeader>
              {/* <CardContent>
                <Badge variant="outline">#Engineering</Badge>
                <Badge variant="outline">#Coffee</Badge>
                <Badge variant="outline">#Coding</Badge>
              </CardContent> */}
              {apply ? (
                <CardFooter className="justify-between">
                  <Button variant={"outline"} className="w-2/5">
                    Preview
                  </Button>
                  <Button className="w-2/5">Apply</Button>
                </CardFooter>
              ) : (
                <CardFooter className="justify-between">
                  <Button variant={"outline"} className="w-full">
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
