import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Creative from "../assets/creative.png";

const Society = () => {
  return (
    <div>
      <h1 className="mx-10 my-5 text-3xl font-semibold">
        Explore Societies @TIET
      </h1>
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>
            <img src={Creative} />
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Creative Computing Society</p>
        </CardContent>
        <CardFooter>
          <Button>Preview</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Society;
