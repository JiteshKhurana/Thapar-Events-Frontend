import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/NavBar";

const ContactUs = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-10">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-medium my-8">Our Team</h2>
        </div>
        <div className="flex flex-wrap">
          {Array(4)
            .fill(0)
            .map(() => (
              <Card className="w-1/4 m-5">
                <Avatar className="h-24 w-24 mx-auto my-5">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/95995545?v=4" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardContent className="text-center">
                  <p>Jitesh Khurana</p>
                  <p>jiteshkhurana59@gmail.com</p>
                  <Badge variant="outline">Frontend</Badge>
                </CardContent>
                <CardFooter className="justify-between">
                  <Button>Instagram</Button>
                  <Button>Github</Button>
                  <Button>Linkedin</Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
