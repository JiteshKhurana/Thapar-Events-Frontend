import { MdDashboard, MdEdit } from "react-icons/md";
import { BiLogOut, BiCalendar } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Societyroot: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="dark:text-white grid grid-cols-12 gap-0 border-t-[1px]">
      <div className="h-full w-full flex flex-col flex-wrap justify-start items-center col-span-3 border-r-[1px]">
        <div>
          <div className="society-photo bg-black rounded-full w-full mt-[10%]">
            <img src="https://avatars.githubusercontent.com/u/34922904?s=280&v=4"></img>
          </div>
          <div className="w-[full] mt-4 font-semibold text-xl">
            Creative Computing Society
          </div>
          <div className="nav-list flex w-full justify-center mt-9">
            <ul className="flex justify-center flex-col gap-5">
              <NavLink to={"dashboard"}>
                <li className="flex items-center gap-2">
                  <MdDashboard className="text-2xl" />
                  Dashboard
                </li>
              </NavLink>
              <NavLink to={"societyevents"}>
                <li className="flex items-center gap-2">
                  <BiCalendar className="text-2xl" />
                  Events
                </li>
              </NavLink>
              <NavLink to={"editprofile"}>
                <li className="flex items-center gap-2">
                  <MdEdit className="text-2xl" />
                  Edit Profile
                </li>
              </NavLink>
              <NavLink
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                  toast("Logout successful", {
                    description: "You have successfully logged out.",
                  });
                }}
                to={"/"}
              >
                <li className="flex items-center gap-2">
                  <BiLogOut className="text-2xl" />
                  Logout
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <Outlet />
      </div>
    </div>
  );
};

export default Societyroot;
