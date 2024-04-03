// import CardShimmer from "@/components/CardShimmer";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CardSlider from "@/components/CardSlider";
import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";

const UserDashBoard = () => {
  //   return {user._id.length === 0 ? (
  //     <div className="col-span-9 rounded-xl p-5">
  //       <Skeleton className="h-10 w-[450px] mb-5" />
  //       <CardShimmer />
  //       <CardShimmer />
  //     </div>
  //   ) : (
  return (
    <div className="col-span-9 rounded-xl p-5">
      {/* <h1 className="text-3xl">Welcome back, {user.name}♥️!</h1> */}
      <CardSlider title="Registrations" apply={false} />
      <CardSlider title="Past Participations" apply={false} />
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-medium my-8">Achievements</h2>
        <Button>See All</Button>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar space-x-5">
        {Array(3)
          .fill(0)
          .map(() => (
            <div>
              <Card className="w-[300px]">
                <CardHeader>
                  <CardTitle>MLSC Participation Certificate</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View</Button>
                  <Button>Download</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
  //   )}
};

export default UserDashBoard;
