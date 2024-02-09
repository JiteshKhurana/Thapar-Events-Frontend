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

const Society = () => {
  const navigate = useNavigate();
  return (
    <div className="m-10">
      <h1 className="my-5 text-3xl font-semibold text-center">
        Explore Societies
      </h1>
      <div className="flex flex-wrap justify-center">
        {Array(12)
          .fill(0)
          .map(() => (
            <Card className="w-1/4 bg-gradient-to-r from-sky-500 to-indigo-500 m-5">
              <CardHeader>
                <CardTitle>
                  <img src={Creative} className="w-1/2 h-1/2 mx-auto " />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">Creative Computing Society</p>
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
    </div>
  );
};

export default Society;
