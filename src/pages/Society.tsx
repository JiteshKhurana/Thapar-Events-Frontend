import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Creative from "../assets/creative.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import CardShimmer from "@/components/CardShimmer";

interface Society {
  about: string;
  email: string;
  name: string;
  role: string;
  year_of_formation: string;
  _Sid: string;
  _Uid: string;
}

const Society: React.FC = () => {
  const navigate = useNavigate();
  const [societies, setSocieties] = useState<Society[]>([]);
  useEffect(() => {
    axios
      .get(
        "https://thapar-event-management-system-production.up.railway.app/soc/get"
      )
      .then((resp) => {
        setSocieties(resp.data);
      })
      .catch((error) => {
        toast(error);
      });
  });
  return (
    <div>
      <div className="m-10">
        <h1 className="my-5 text-3xl font-semibold text-center">
          Explore Societies
        </h1>
        {societies.length === 0 ? (
          <CardShimmer />
        ) : (
          <div className="flex flex-wrap justify-center">
            {societies.map((society) => (
              <Card
                key={society._Uid}
                className="w-1/4 bg-gradient-to-r from-sky-500 to-indigo-500 m-5"
              >
                <CardHeader>
                  <CardTitle>
                    <img src={Creative} className="w-1/2 h-1/2 mx-auto " />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center">{society.name}</p>
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
      </div>
    </div>
  );
};

export default Society;
