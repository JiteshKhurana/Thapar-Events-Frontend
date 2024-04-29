import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useSocieties from "@/hooks/useSocieties";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CardShimmer from "@/components/CardShimmer";

const Society: React.FC = () => {
  useSocieties();
  const navigate = useNavigate();
  const societies = useSelector(
    (store: RootState) => store.societies.societiesList
  );
  if (!societies) return <CardShimmer />;
  return (
    <div>
      <div className=" flex flex-col items-center justify-start bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712223505/Clip_path_group_jvxubn.svg')] bg-no-repeat bg-cover">
        <h1 className="my-10 text-4xl font-semibold text-center ">
          Explore Societies, Student Chapters and Clubs at TIET
        </h1>
        <div className="flex flex-wrap gap-5 sm:gap-10 justify-center max-w-[1900px]">
          {societies.map((society) => (
            <Card
              key={society._Sid}
              className="w-[93vw] sm:w-[400px] bg-[url('https://res.cloudinary.com/dhrfyg57t/image/upload/v1712311662/01_lotoi6.jpg')] bg-no-repeat bg-cover shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="bg-black bg-opacity-30">
                <CardHeader>
                  <CardTitle>
                    <img
                      src={society.image}
                      className="w-32 mx-auto rounded-full"
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
                        society.name.split(` `).join("-").toLowerCase(),
                        {
                          state: {
                            societyEmail: society.email,
                            societyId: society._Sid,
                          },
                        }
                      )
                    }
                    className="w-full py-5 text-sm transition-all bg-opacity-70"
                    variant={"outline"}
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
