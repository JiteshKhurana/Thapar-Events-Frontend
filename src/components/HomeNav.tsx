import Logo from "../assets/tietlogo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button.tsx";
import { ModeToggle } from "./mode-toggle.tsx";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINT, GOOGLE_API_LOGIN } from "@/lib/constants.ts";
import SyncLoader from "react-spinners/SyncLoader";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, CSSProperties } from "react";
import { isAdmin, isLoggedIn, isSuperAdmin, isUser } from "@/lib/helper.ts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.tsx";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Events", href: "/events", current: false },
  { name: "Societies", href: "/societies", current: false },
  { name: "Feedback", href: "/Feedback", current: false },
];

const HomeNav: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [color] = useState("#FF0000");
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const cookies = new Cookies(null, { path: "/" });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      const userInfo = await axios.get(GOOGLE_API_LOGIN, {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });
      axios
        .post(API_ENDPOINT + "create", {
          email: userInfo.data.email,
          name: userInfo.data.name,
          image: userInfo.data.picture,
          token: tokenResponse.access_token,
        })
        .then((resp) => {
          const decoded = jwtDecode(resp.data.token);
          cookies.set("token", resp.data.token, {
            expires: decoded.exp ? new Date(decoded.exp * 1000) : undefined,
          });
          if (isAdmin()) {
            localStorage.setItem("name", resp.data.society.name);
            localStorage.setItem("email", resp.data.society.email);
            localStorage.setItem("id", resp.data.society._Sid);
            localStorage.setItem("image", resp.data.society.image);
          } else {
            localStorage.setItem("name", resp.data.user.name);
            localStorage.setItem("email", resp.data.user.email);
            localStorage.setItem("image", resp.data.user.image);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          toast(error);
        });
    },
    onError: (errorResponse) => toast(errorResponse.error),
  });
  const location = useLocation();
  const navigate = useNavigate();
  if (isLoading)
    return (
      <SyncLoader
        className="text-center"
        color={color}
        cssOverride={override}
        loading={isLoading}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  const image = localStorage.getItem("image");
  let navigateTo = "";
  const loggedIn = isLoggedIn();
  if (isAdmin()) {
    navigateTo = "/society";
  } else if (isSuperAdmin()) {
    navigateTo = "/superadmin";
  } else if (isUser()) {
    navigateTo = "/profile";
  }
  return location.pathname === "/" ? (
    <div className="absolute z-20 w-full">
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-[90%l px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 font-bold text-white hover:bg-white hover:bg-opacity-30 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-start ml-10 sm:ml-0 sm:items-stretch sm:justify-between">
                  <div className="flex flex-shrink-0 items-center">
                    <NavLink
                      className="flex items-center justify-center gap-3"
                      to="/"
                    >
                      <img src={Logo} alt="logo" className="w-8" />
                      <h1 className="text-white text-2xl font-bold hidden md:block">
                        Thapar University
                      </h1>
                    </NavLink>
                  </div>
                  <div className="hidden sm:mx-6 sm:block">
                    <div className="flex h-full items-center space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className=" text-white hover:bg-white hover:bg-opacity-10 hover:text-white rounded-md px-3 py-2 font-medium"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-0 sm:relative  flex gap-3 items-center h-">
                    {loggedIn ? (
                      <Avatar
                        className="cursor-pointer"
                        onClick={() => navigate(navigateTo)}
                      >
                        <AvatarImage
                          src={image ? image : "https://github.com/shadcn.png"}
                          alt="@shadcn"
                        />
                        <AvatarFallback>Profile Pic</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Button onClick={() => googleLogin()}>Sign in</Button>
                    )}
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="transition-all bg-black bg-opacity-90 text-black m-3 space-y-1 p-3 rounded-md">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="flex justify-center font-semibold text-white hover:bg-black hover:bg-opacity-100  rounded-md px-3 py-2 text-base "
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  ) : (
    <div>
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="mx-auto px-10">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700  hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-start ml-10 sm:ml-0 sm:items-center sm:justify-between">
                  <div className="flex flex-shrink-0 items-center">
                    <NavLink
                      className="flex items-center justify-center gap-3"
                      to="/"
                    >
                      <img src={Logo} alt="logo" className="w-8" />
                      <h1 className="text-2xl font-bold hidden md:block">
                        Thapar University
                      </h1>
                    </NavLink>
                  </div>
                  <div className="hidden sm:mx-6 sm:block">
                    <div className="flex h-full items-center space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          to={item.href}
                          key={item.name}
                          className="  hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 font-medium"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-0 sm:relative  flex gap-3 items-center h-">
                    {loggedIn ? (
                      <Avatar
                        className="cursor-pointer"
                        onClick={() => navigate(navigateTo)}
                      >
                        <AvatarImage
                          src={image ? image : "https://github.com/shadcn.png"}
                          alt="@shadcn"
                        />
                        <AvatarFallback>Profile Pic</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Button onClick={() => googleLogin()}>Sign in</Button>
                    )}
                    <ModeToggle />
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="border m-3 space-y-1 p-3 rounded-md">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="flex justify-center hover:bg-gray-100 hover:text-black  rounded-md px-3 py-2 text-base font-medium"
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default HomeNav;
