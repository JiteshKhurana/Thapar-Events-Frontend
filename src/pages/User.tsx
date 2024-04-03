import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "universal-cookie";

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
  const cookies = new Cookies(null, { path: "/" });

  const token = cookies.get("token");
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
        {user._id.length === 0 ? (
          <Skeleton className="h-4 w-[100px]" />
        ) : (
          <h3 className="text-xl">@{user.name}</h3>
        )}
        <NavLink
          to={"/profile"}
          className={({ isActive }) => {
            return isActive
              ? "w-full bg-slate-300 text-black p-2 m-1 rounded-lg text-center"
              : "w-full bg-white text-black p-2 m-1 rounded-lg text-center";
          }}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "w-full bg-slate-300 text-black p-2 m-1 rounded-lg text-center"
              : "w-full bg-white text-black p-2 m-1 rounded-lg text-center";
          }}
          to={"/profile/editprofile"}
        >
          Edit Profile
        </NavLink>

        <Button
          onClick={() => {
            cookies.remove("token");
            navigate("/");
            toast("Logout successful", {
              description: "You have successfully logged out.",
            });
          }}
          className="w-full bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default User;
