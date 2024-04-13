import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";

const EventDashboardRoot = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  return (
    <div className="flex flex-wrap justify-center">
      <div className="relative flex flex-col mx-5 mt-5 gap-3 w-[90%] md:w-[20%] md:h-[90vh] shadow-2xl items-center rounded-xl p-5 border ">
        <Button
          onClick={() => navigate("/society")}
          className="absolute left-2 top-2 bg-transparent text-black dark:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  "
        >
          Go Back
        </Button>
        <Avatar className="h-24 w-24 mt-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Society Profile</AvatarFallback>
        </Avatar>
        <NavLink
          to={"/eventdashboard/" + eventId}
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
          to={"registrations"}
          className={({ isActive }) => {
            return isActive
              ? " min-w-[80%] max-w-[300px] bg-black text-white p-2  rounded-lg text-center text-sm"
              : " min-w-[80%] max-w-[300px] bg-transparent hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  ";
          }}
          end
        >
          Manage Registrations
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? " min-w-[80%] max-w-[300px] bg-black text-white p-2  rounded-lg text-center text-sm"
              : " min-w-[80%] max-w-[300px] bg-transparent hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  ";
          }}
          to={"editevent"}
        >
          Edit Event
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? " min-w-[80%] max-w-[300px] bg-black text-white p-2  rounded-lg text-center text-sm"
              : " min-w-[80%] max-w-[300px] bg-transparent hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  ";
          }}
          to={"editregistrationform"}
        >
          Registration Form
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default EventDashboardRoot;
