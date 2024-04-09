import { Separator } from "@/components/ui/separator";
import Banner from "../assets/banner.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CardSlider from "@/components/CardSlider";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "@/lib/constants";
import { toast } from "sonner";
import CardShimmer from "@/components/CardShimmer";

interface Society {
  _Sid: string;
  _Uid: string;
  email: string;
  name: string;
  year_of_formation: string;
  role: string;
  about: string;
}

const SocietyDetail: React.FC = () => {
  const { societyId } = useParams();
  const [society, setSociety] = useState<Society | null>(null);
  async function getEvents() {
    axios
      .get(API_ENDPOINT + "/soc/get?societyId=" + societyId)
      .then((res) => setSociety(res.data))
      .catch((error) => toast(error));
  }
  useEffect(() => {
    getEvents();
  }, []);

  if (!society) return <CardShimmer />;
  return (
    <div>
      <div className="relative">
        <img src={Banner} />
        <div className="absolute left-10 bottom-10 flex items-center space-x-5">
          <Avatar className="h-28 w-28">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl">{society.name}</h1>
        </div>
      </div>
      <Separator />
      <div className="mx-10">
        <h2 className="text-3xl font-medium my-8">About Us</h2>
        <p>{society.about}</p>
        <Separator className="mt-3" />
        <CardSlider title="Events" apply={true} />
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
