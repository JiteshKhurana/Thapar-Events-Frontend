import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ComboBox } from "@/components/ui/ComboBox";
import { Badge } from "@/components/ui/badge";
// import Event from "../assets/event.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import CardShimmer from "@/components/CardShimmer";
import { useNavigate } from "react-router-dom";
import useEvents from "@/hooks/useEvents";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// interface Event {
//   description: string;
//   email: string;
//   team: false;
//   title: string;
//   visibility: boolean;
//   _Eid: string;
//   _Sid: string;
//   _Uid: string;
// }

const Events: React.FC = () => {
  useEvents();
  const events = useSelector((store: RootState) => store.events.eventsList);
  const navigate = useNavigate();
  if (!events) return <CardShimmer />;
  return (
    <div>
      <div className="m-10">
        <div>
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="filters-container flex items-center justify-center">
              <TabsList className="mt-5 mx-5 shadow-xl py-3 m-3">
                <TabsTrigger className="w-[150px]" value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger className="w-[150px]" value="past">Past</TabsTrigger>
              </TabsList>
            </div>
            {/* <ComboBox /> */}
            <TabsContent value="upcoming">
              <div className="flex flex-wrap justify-center">
                {events.map((event) => (
                  <Card className="w-[400px] m-5 overflow-hidden shadow-2xl">
                    <div className="w-[400px] h-[200px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')]"> </div>

                    <CardHeader className="flex flex-row space-x-5 ">
                      <Avatar className="h-16 w-16">
                        <AvatarImage className="" src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.email}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      <Badge variant="outline" className="rounded border font-medium">#Engineering</Badge>
                      <Badge variant="outline" className="rounded border font-medium">#Coffee</Badge>
                      <Badge variant="outline" className="rounded border font-medium">#Coding</Badge>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() =>
                          navigate(
                            event.title.split(" ").join("-").toLowerCase()
                          )
                        }
                        className="w-full"
                      >
                        Preview
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="past">
              <div className="flex flex-wrap justify-center">
                {events.map((event) => (
                  <Card className="w-[400px] m-5 overflow-hidden shadow-2xl">
                    <div className="w-[400px] h-[200px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')]"> </div>
                    <CardHeader className="flex flex-row space-x-5">
                      <Avatar className="h-16 w-16">
                        <AvatarImage className="" src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.email}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex gap-2">
                      <Badge variant="outline" className="rounded border font-medium">#Engineering</Badge>
                      <Badge variant="outline" className="rounded border font-medium">#Coffee</Badge>
                      <Badge variant="outline" className="rounded border font-medium">#Coding</Badge>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <Button
                        className="w-full"
                        onClick={() =>
                          navigate(
                            event.title.split(" ").join("-").toLowerCase()
                          )
                        }
                      >
                        Preview
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events;
