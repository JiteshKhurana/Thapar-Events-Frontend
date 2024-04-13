import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "@/hooks/useUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Cookies from "universal-cookie";
import CardShimmer from "@/components/CardShimmer";
import { deleteUser } from "@/store/UserSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const User: React.FC = () => {
  const dispatch = useDispatch();
  useUser();
  const user = useSelector((store: RootState) => store.user.currentUser);
  const cookies = new Cookies(null, { path: "/" });
  const navigate = useNavigate();
  if (!user) return <CardShimmer />;
  return (
    <div className="flex flex-wrap justify-center ">
      <div className="flex flex-col mx-5 mt-5 gap-3 w-[90%] md:w-[20%] md:h-[90vh] shadow-2xl items-center rounded-xl p-5 border ">
        <Avatar className="h-24 w-24">
          {user.image ? (
            <AvatarImage src={user.image} />
          ) : (
            <AvatarImage src="https://github.com/shadcn.png" />
          )}
          <AvatarFallback>Profile Pic</AvatarFallback>
        </Avatar>
        {!user ? (
          <Skeleton className="h-4 w-[100px]" />
        ) : (
          <h3 className="text-xl">@{user.name.split(" ").join("_")}</h3>
        )}
        <NavLink
          to={"/profile"}
          className={({ isActive }) => {
            return isActive
              ? " min-w-[80%] max-w-[300px] bg-black text-white p-2  rounded-lg text-center text-sm"
              : " min-w-[80%] max-w-[300px] bg-transparent hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  ";
          }}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? " min-w-[80%] max-w-[300px] bg-black text-white p-2  rounded-lg text-center text-sm"
              : " min-w-[80%] max-w-[300px] bg-transparent hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  ";
          }}
          to={"/profile/editprofile"}
        >
          Edit Profile
        </NavLink>

        <AlertDialog>
          <AlertDialogTrigger className="min-w-[80%] max-w-[300px]">
            <Button className="text-sm  min-w-[80%] max-w-[300px] border border-red-500 text-red-500 bg-transparent  hover:bg-red-500 hover:text-white transition-all duration-300">
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. You will be logged out of
                ConnectHub.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  cookies.remove("token");
                  localStorage.clear();
                  dispatch(deleteUser());
                  navigate("/");
                  toast("Logout successful", {
                    description: "You have successfully logged out.",
                  });
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Outlet />
    </div>
  );
};

export default User;
