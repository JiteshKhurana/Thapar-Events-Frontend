import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

type FCProps = { title: string; apply: boolean };

const CardSlider: React.FC<FCProps> = ({ title, apply }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-medium my-8">{title}</h2>
        <Button>See All</Button>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar space-x-5">
        {Array(12)
          .fill(0)
          .map(() => (
            <Card className="w-1/4 min-w-[300px]">
              <img src={Event} className="h-44" />
              <CardHeader className="flex flex-row space-x-5">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Escalade</CardTitle>
                  <CardDescription>Creative Computing Society</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">#Engineering</Badge>
                <Badge variant="outline">#Coffee</Badge>
                <Badge variant="outline">#Coding</Badge>
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
                  <Button variant={"outline"} className="w-full">
                    Preview
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CardSlider;
