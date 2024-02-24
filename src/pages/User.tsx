import CardSlider from "@/components/CardSlider";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const User: React.FC = () => {
  interface IUser {
    _id: string;
    email: string;
    name: string;
    phone: number;
    rollno: number;
    branch: string;
    batch: number;
    role: string;
    image: string;
  }
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<IUser>({
    _id: "",
    email: "",
    name: "",
    phone: 0,
    rollno: 0,
    branch: "",
    batch: 0,
    role: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(
        "https://thapar-event-management-system-production.up.railway.app/users/get",
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((resp) => setUser(resp.data))
      .catch((error) => {
        toast(error);
      });
  }, []);
  console.log(user);

  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-12 m-16 gap-x-5">
      <div className="flex flex-col col-span-3 space-y-3 items-center rounded-xl p-5 border-white border max-h-96">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="text-xl">@{user.name}</h3>
        <Button className="w-full">Dashboard</Button>
        <Button
          onClick={() => navigate("/user/edit/" + user._id)}
          className="w-full"
        >
          Edit Profile
        </Button>
        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/");
            toast("Logout successful", {
              description: "You have successfully logged out.",
            });
          }}
          className="w-full"
        >
          Logout
        </Button>
      </div>
      <div className="col-span-9 rounded-xl p-5">
        <h1 className="text-3xl">Welcome back, {user.name}♥️!</h1>
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
