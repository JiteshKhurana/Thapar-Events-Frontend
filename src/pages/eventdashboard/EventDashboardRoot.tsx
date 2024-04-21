import { Button } from "@/components/ui/button";
import { API_ENDPOINT } from "@/lib/constants";
import { isAdmin } from "@/lib/helper";
import {
  addCurrentEvent,
  addCurrentEventMetrics,
  removeCurrentEvent,
} from "@/store/eventDashboardSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "universal-cookie";

const EventDashboardRoot = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const eventDashboardId = eventId ?? "";
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const dispatch = useDispatch();
  async function getEvent() {
    axios
      .get(API_ENDPOINT + "event/get?eventId=" + eventDashboardId)
      .then((res) => dispatch(addCurrentEvent(res.data.event)))
      .catch((error) => toast(error));
  }
  async function getEventMetrics() {
    axios
      .get(API_ENDPOINT + "event/dashboard/" + eventDashboardId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => dispatch(addCurrentEventMetrics(res.data)))
      .catch((error) => toast(error));
  }

  useEffect(() => {
    dispatch(removeCurrentEvent());
    getEvent();
    getEventMetrics();
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      <div className="relative flex flex-col mx-5 mt-5 gap-3 w-[90%] md:w-[20%] md:h-[90vh] shadow-2xl items-center rounded-xl p-5 border ">
        <Button
          onClick={() => {
            isAdmin() ? navigate("/society") : navigate("/superadmin/events");
          }}
          className="absolute left-2 top-2 bg-transparent text-black dark:text-white hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  "
        >
          Go Back
        </Button>
        <NavLink
          to={"/eventdashboard/" + eventId}
          className={({ isActive }) => {
            return isActive
              ? " min-w-[80%] max-w-[300px] bg-black text-white p-2  rounded-lg text-center text-sm mt-10"
              : " min-w-[80%] max-w-[300px] bg-transparent hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white  transition-all duration-300 border p-2 rounded-md text-sm text-center  mt-10";
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
        {isAdmin() && (
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
        )}
        {isAdmin() && (
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
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default EventDashboardRoot;
