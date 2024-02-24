import CardSlider from "@/components/CardSlider";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const User: React.FC = () => {
  return (
    <div className="grid grid-cols-12 m-16 gap-x-5">
      <div className="flex flex-col col-span-3 space-y-3 items-center rounded-xl p-5 border-white border max-h-96">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-xl">@jitesh</h3>
        <Button className="w-full">Dashboard</Button>
        <Button className="w-full">Edit Profile</Button>
        <Button className="w-full">Logout</Button>
      </div>
      <div className="col-span-9 rounded-xl p-5">
        <h1 className="text-3xl">Welcome back, Jitesh♥️!</h1>
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
    </div>
  );
};

export default User;
