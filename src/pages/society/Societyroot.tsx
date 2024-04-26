import { Link } from "react-router-dom";
import { Home, PanelLeft, Edit, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { Button } from "@/components/ui/button";
import useSocietyProfile from "@/hooks/useSocietyProfile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CardShimmer from "@/components/CardShimmer";
import { deletecurrentSociety } from "@/store/societyProfileSlice";

const SocietyRoot = () => {
  useSocietyProfile();
  const cookies = new Cookies(null, { path: "/" });
  const navigate = useNavigate();
  const society = useSelector(
    (store: RootState) => store.society.currentSociety
  );
  const dispatch = useDispatch();
  if (!society) return <CardShimmer />;
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
                  to="/society"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="editprofile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Edit className="h-5 w-5" />
                  <span className="sr-only">Edit Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Edit Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="overflow-hidden rounded-full"
                    >
                      <img
                        src={society.image}
                        width={36}
                        height={36}
                        alt="Avatar"
                        className="overflow-hidden rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("editprofile")}>
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        cookies.remove("token");
                        localStorage.clear();
                        dispatch(deletecurrentSociety());
                        navigate("/");
                        toast("Logout successful", {
                          description: "You have successfully logged out.",
                        });
                      }}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
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
                  to="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <img
                    src="https://res.cloudinary.com/dhrfyg57t/image/upload/v1713374232/tietlogo_paawdb.png"
                    className="w-8"
                  />
                  <span className="sr-only">Thapar University</span>
                </Link>
                <Link
                  to="/society"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>

                <Link
                  to="editprofile"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Edit className="h-5 w-5" />
                  Edit Profile
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    cookies.remove("token");
                    localStorage.clear();
                    toast("Logout successful", {
                      description: "You have successfully logged out.",
                    });
                  }}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
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

export default SocietyRoot;
