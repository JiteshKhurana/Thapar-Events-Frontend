import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import Creative from "../assets/creative.png";
import { useNavigate } from "react-router-dom";
import CardShimmer from "@/components/CardShimmer";
import useSocieties from "@/hooks/useSocieties";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
  useSocieties();
  const navigate = useNavigate();
  const societies = useSelector(
    (store: RootState) => store.societies.societiesList
  );
  if (!societies) return <CardShimmer />;
  return (
    <div>
      <div className=" flex flex-col items-center justify-start">
        <h1 className="my-10 text-4xl font-semibold text-center ">
          Explore Societies, Student Chapters and Clubs at TIET
        </h1>
        <div className="flex flex-wrap gap-10 justify-center max-w-[1900px]">
          {societies.map((society) => (
            <Card
              key={society._Uid}
              className="w-[400px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')] bg-no-repeat bg-cover shadow-xl overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="bg-black bg-opacity-30">
                <CardHeader>
                  <CardTitle>
                    <img
                      src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1712308980/ccs_logo_hq2ysz.jpg"
                      className="w-40  mx-auto "
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mt-5">
                    <p className=" text-white text-lg font-semibold">
                      {society.name}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() =>
                      navigate(
                        society.name.split(` `).join("-").toLowerCase() +
                          "/" +
                          society._Sid
                      )
                    }
                    className="w-full py-5 text-sm font-light hover:font-medium transition-all rounded-sm bg-black text-white bg-opacity-60 hover:bg-opacity-70 "
                  >
                    Learn More
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Society;
