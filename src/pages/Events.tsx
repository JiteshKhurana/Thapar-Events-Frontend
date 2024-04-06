import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ComboBox } from "@/components/ui/ComboBox";
import { Badge } from "@/components/ui/badge";
import { v4 as uuidv4 } from "uuid";

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
import { BiCalendar } from "react-icons/bi";

const Events: React.FC = () => {
  useEvents();
  const events = useSelector((store: RootState) => store.events.eventsList);
  const navigate = useNavigate();
  if (!events) return <CardShimmer />;
  return (
    <div>
      <div className="min-h-[90vh] m-10 flex flex-col justify-start items-center bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712223505/Clip_path_group_jvxubn.svg')] bg-no-repeat bg-cover dark:bg-opacity-10">
        <span className="font-semibold text-4xl mb-5 ">
          Explore Events at TIET
        </span>
        <div>
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="filters-container flex items-center justify-center">
              <TabsList className="mt-5 mx-5 shadow-xl py-3 m-3">
                <TabsTrigger className="w-[150px]" value="upcoming">
                  Upcoming
                </TabsTrigger>
                <TabsTrigger className="w-[150px]" value="past">
                  Past
                </TabsTrigger>
              </TabsList>
            </div>
            {/* <ComboBox /> */}
            <TabsContent value="upcoming">
              <div className="flex flex-wrap justify-center">
                {events.map((event) => (
                  <Card
                    key={uuidv4()}
                    className="w-[400px] m-5 overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-[400px] h-[200px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')]"></div>

                    <CardHeader className="flex flex-row space-x-5 ">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          className=""
                          src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.soc_name}</CardDescription>
                        <CardDescription className="flex items-center gap-1">
                          <BiCalendar className="text-black dark:text-white" />
                          24-04-2024
                        </CardDescription>
                      </div>
                    </CardHeader>

                    {event.hashtags && (
                      <CardContent className="flex gap-2 justify-center">
                        {event.hashtags.map((hashtag) => (
                          <Badge
                            key={uuidv4()}
                            className="p-2"
                            variant="outline"
                          >
                            #{hashtag}
                          </Badge>
                        ))}
                      </CardContent>
                    )}
                    <CardFooter>
                      <Button
                        onClick={() =>
                          navigate(
                            event.title.split(" ").join("-").toLowerCase() +
                              "/" +
                              event._Eid
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
                  <Card
                    key={uuidv4()}
                    className="w-[400px] m-5 overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-[400px] h-[200px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')]"></div>

                    <CardHeader className="flex flex-row space-x-5 ">
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          className=""
                          src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.soc_name}</CardDescription>
                      </div>
                    </CardHeader>

                    {event.hashtags && (
                      <CardContent className="flex gap-2">
                        {event.hashtags.map((hashtag) => (
                          <Badge
                            key={uuidv4()}
                            className="p-2"
                            variant="outline"
                          >
                            #{hashtag}
                          </Badge>
                        ))}
                      </CardContent>
                    )}
                    <CardFooter>
                      <Button
                        onClick={() =>
                          navigate(
                            event.title.split(" ").join("-").toLowerCase() +
                              "/" +
                              event._Eid
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Events;
