import { Separator } from "@/components/ui/separator";
import Banner from "../assets/banner.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Event from "../assets/event.png";
import Gallery from "../assets/gallery.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NavBar from "@/components/NavBar";

const SocietyDetail: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="relative">
        <img src={Banner} />
        <div className="absolute left-10 bottom-10 flex items-center space-x-5">
          <Avatar className="h-28 w-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl">Creative Computing Society</h1>
        </div>
      </div>
      <Separator />
      <div className="mx-10">
        <h2 className="text-3xl font-medium my-8">About Us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam efficitur
          felis ac mauris scelerisque placerat. Curabitur congue eros non lorem
          cursus cursus. Donec quam ipsum, sodales et magna id, tincidunt auctor
          dolor. Praesent ac ornare diam. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Curabitur est felis, semper quis sem sit
          amet, scelerisque semper elit. Maecenas suscipit condimentum purus nec
          posuere. Sed id nulla justo. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. Nulla gravida turpis metus, eu placerat tortor
          tempor vitae. Suspendisse vel lacus quis nisl sagittis ultricies quis
          nec enim. Aliquam pharetra at mi vel sollicitudin.
        </p>
        <Separator className="mt-3" />
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium my-8">Events</h2>
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
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium my-8">Photo Gallery</h2>
          <Button>See All</Button>
        </div>
        <div className="flex overflow-x-scroll no-scrollbar space-x-5">
          {Array(12)
            .fill(0)
            .map(() => (
              <img src={Gallery} className="h-1/6 w-1/6 rounded-xl" />
            ))}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium my-8">Our Team</h2>
          <Button>See All</Button>
        </div>
        <div className="flex overflow-x-scroll no-scrollbar space-x-5">
          {Array(5)
            .fill(0)
            .map(() => (
              <Card className="w-1/4 min-w-[300px]">
                <Avatar className="h-24 w-24 mx-auto my-5">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardContent className="text-center">
                  <p>Jitesh Khurana</p>
                  <p>jiteshkhurana59@gmail.com</p>
                  <p>General Sec</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button>Instagram</Button>
                  <Button>Linkedin</Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SocietyDetail;
