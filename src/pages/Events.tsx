import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComboBox } from "@/components/ui/ComboBox";
import { Badge } from "@/components/ui/badge";
import Event from "../assets/event.png";

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

interface Event {
  description: string;
  email: string;
  team: false;
  title: string;
  visibility: boolean;
  _Eid: string;
  _Sid: string;
  _Uid: string;
}

const Events: React.FC = () => {
  useEvents();
  const events = useSelector((store: RootState) => store.events.eventsList);
  const navigate = useNavigate();
  return (
    <div>
      <div className="m-10">
        <div>
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mt-5 mx-5">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <ComboBox />
            <TabsContent value="upcoming">
              {events.length === 0 ? (
                <CardShimmer />
              ) : (
                <div className="flex flex-wrap justify-center">
                  {events.map((event) => (
                    <Card className="w-1/4 m-5">
                      <img src={Event} className="w-full" />
                      <CardHeader className="flex flex-row space-x-5">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <CardDescription>{event.email}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="outline">#Engineering</Badge>
                        <Badge variant="outline">#Coffee</Badge>
                        <Badge variant="outline">#Coding</Badge>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={() => navigate(`creative-computing-society`)}
                          className="w-full"
                        >
                          Preview
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="past">
              <div className="flex flex-wrap justify-center">
                {events.map((event) => (
                  <Card className="w-1/4 m-5">
                    <img src={Event} className="w-full" />
                    <CardHeader className="flex flex-row space-x-5">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.email}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">#Engineering</Badge>
                      <Badge variant="outline">#Coffee</Badge>
                      <Badge variant="outline">#Coding</Badge>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <Button variant={"outline"} className="w-2/5">
                        Preview
                      </Button>
                      <Button className="w-2/5">Apply</Button>
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
