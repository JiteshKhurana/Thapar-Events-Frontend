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

const Events: React.FC = () => {
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
              <div className="flex flex-wrap justify-center">
                {Array(12)
                  .fill(0)
                  .map(() => (
                    <Card className="w-1/4 m-5">
                      <img src={Event} className="w-full" />
                      <CardHeader className="flex flex-row space-x-5">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>Escalade</CardTitle>
                          <CardDescription>
                            Creative Computing Society
                          </CardDescription>
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
            <TabsContent value="past">
              <div className="flex flex-wrap justify-center">
                {Array(12)
                  .fill(0)
                  .map(() => (
                    <Card className="w-1/4 m-5">
                      <img src={Event} className="h-44" />
                      <CardHeader className="flex flex-row space-x-5">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>Hackathon</CardTitle>
                          <CardDescription>MLSC</CardDescription>
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
