import { Link, Outlet } from "react-router-dom";
import {
  Edit,
  FormInput,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
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
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const EventDashboardRoot = () => {
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
    <div className="flex min-h-screen w-full flex-col bg-background">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            to="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <img
              src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1713374232/tietlogo_paawdb.png"
              className="w-8"
            />
            <span className="sr-only">Thapar University</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={"/eventdashboard/" + eventId}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="registrations"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Registrations</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Registrations</TooltipContent>
            </Tooltip>
            {isAdmin() && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="editevent"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Edit className="h-5 w-5" />
                    <span className="sr-only">Edit Event</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Edit Event</TooltipContent>
              </Tooltip>
            )}
            {isAdmin() && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="editregistrationform"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <FormInput className="h-5 w-5" />
                    <span className="sr-only">Registration Form</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Registration Form</TooltipContent>
              </Tooltip>
            )}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={isAdmin() ? "/society" : "/superadmin"}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <MdOutlineArrowBackIosNew className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Back</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <Outlet />
      </div>
    </div>
  );
};

export default EventDashboardRoot;
