import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/useUser";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "universal-cookie";
import CardShimmer from "@/components/CardShimmer";

const User: React.FC = () => {
  useUser();
  const user = useSelector((store: RootState) => store.user.currentUser);
  const cookies = new Cookies(null, { path: "/" });
  const navigate = useNavigate();
  if (!user) return <CardShimmer />;
  return (
    <div className="grid grid-cols-12 m-16 gap-x-5">
      <div className="flex flex-col col-span-3 space-y-3 items-center rounded-xl p-5 border-black border max-h-96 dark:border-white">
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
              ? "w-full bg-gray-400 text-black p-2 m-1 rounded-lg text-center"
              : "w-full bg-black text-white p-2 m-1 rounded-lg text-center dark:bg-white dark:text-black";
          }}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "w-full bg-gray-400 text-black p-2 m-1 rounded-lg text-center"
              : "w-full bg-black text-white p-2 m-1 rounded-lg text-center dark:bg-white dark:text-black";
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
          className="w-full bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default User;
