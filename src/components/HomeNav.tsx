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

// import { Fragment } from 'react'
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Events", href: "/events", current: false },
  { name: "Societies", href: "/societies", current: false },
];

// function classNames(...classes: any) {
//   return classes.filter(Boolean).join(' ')
// }

const HomeNav: React.FC = () => {
  const cookies = new Cookies(null, { path: "/" });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
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
          if (resp.data.user) {
            localStorage.setItem("name", resp.data.user.name);
            localStorage.setItem("email", resp.data.user.email);
            localStorage.setItem("role", resp.data.user.role);
          } else {
            localStorage.setItem("name", resp.data.society.name);
            localStorage.setItem("id", resp.data.society._Uid);
            localStorage.setItem("role", resp.data.society.role);
          }
          // window.location.reload();
        })
        .catch((error) => {
          toast(error);
        });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const location = useLocation();
  const navigate = useNavigate();

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
                        ConnectHub
                      </h1>
                    </NavLink>
                  </div>
                  <div className="hidden sm:mx-6 sm:block">
                    <div className="flex h-full items-center space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          to={item.href}
                          className=" text-white hover:bg-white hover:bg-opacity-10 hover:text-white rounded-md px-3 py-2 font-medium"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-0 sm:relative  flex gap-3 items-center h-">
                    {cookies.get("token") ? (
                      localStorage.getItem("role") === "admin" &&
                      localStorage.getItem("id") ? (
                        <Button onClick={() => navigate("/society/dashboard")}>
                          HI {localStorage.getItem("name")?.toUpperCase()}
                        </Button>
                      ) : (
                        <Button onClick={() => navigate("/profile")}>
                          HI {localStorage.getItem("name")?.toUpperCase()}
                        </Button>
                      )
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
                        ConnectHub
                      </h1>
                    </NavLink>
                  </div>
                  <div className="hidden sm:mx-6 sm:block">
                    <div className="flex h-full items-center space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          to={item.href}
                          className="  hover:bg-gray-800 hover:text-white rounded-md px-3 py-2 font-medium"
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-0 sm:relative  flex gap-3 items-center h-">
                    {cookies.get("token") ? (
                      localStorage.getItem("role") === "admin" &&
                      localStorage.getItem("id") ? (
                        <Button onClick={() => navigate("/society/dashboard")}>
                          HI {localStorage.getItem("name")?.toUpperCase()}
                        </Button>
                      ) : (
                        <Button onClick={() => navigate("/profile")}>
                          HI {localStorage.getItem("name")?.toUpperCase()}
                        </Button>
                      )
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

// const HomeNav: React.FC = () => {
//   const cookies = new Cookies(null, { path: "/" });

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       const userInfo = await axios.get(GOOGLE_API_LOGIN, {
//         headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//       });
//       axios
//         .post(API_ENDPOINT + "create", {
//           email: userInfo.data.email,
//           name: userInfo.data.name,
//           token: tokenResponse.access_token,
//         })
//         .then((resp) => {
//           const decoded = jwtDecode(resp.data.token);
//           cookies.set("token", resp.data.token, {
//             expires: decoded.exp ? new Date(decoded.exp * 1000) : undefined,
//           });
//           if (resp.data.user) {
//             localStorage.setItem("name", resp.data.user.name);
//             localStorage.setItem("email", resp.data.user.email);
//             localStorage.setItem("role", resp.data.user.role);
//           } else {
//             localStorage.setItem("name", resp.data.society.name);
//             localStorage.setItem("id", resp.data.society._Uid);
//             localStorage.setItem("role", resp.data.society.role);
//           }
//           window.location.reload();
//         })
//         .catch((error) => {
//           toast(error);
//         });
//     },
//     onError: (errorResponse) => console.log(errorResponse),
//   });
//   const location = useLocation();
//   const navigate = useNavigate();
//   return location.pathname === "/" ? (
//     <div className="absolute z-20 flex items-center p-2 mt-1 justify-between w-full flex-col md:flex-row sm:items-center">
//       <div className="logo flex space-x-5 items-center ml-16">
//         <a className="flex items-center justify-center gap-3" href="/">
//           <img src={Logo} alt="logo" className="w-10" />
//           <h1 className="text-white text-3xl">ConnectHub</h1>
//         </a>
//       </div>
//       <div className="nav-links">
//         <ul className="flex space-x-9 text-white">
//           <NavLink
//             to="/"
//             className={({ isActive }) => {
//               return isActive ? "text-blue-500" : "";
//             }}
//           >
//             <li className="hover:text-blue-500">Home</li>
//           </NavLink>
//           <NavLink
//             to="/events"
//             className={({ isActive }) => {
//               return isActive ? "text-blue-500" : "";
//             }}
//           >
//             <li className="hover:text-blue-500">Events</li>
//           </NavLink>
//           <NavLink
//             to="/societies"
//             className={({ isActive }) => {
//               return isActive ? "text-blue-500" : "";
//             }}
//           >
//             <li className="hover:text-blue-500">Societies</li>
//           </NavLink>
//         </ul>
//       </div>
//       <div className="user-signin-button-mode flex space-x-5 mr-16 justify-center">
//         {cookies.get("token") ? (
//           localStorage.getItem("role") === "admin" &&
//             localStorage.getItem("id") ? (
//             <Button onClick={() => navigate("/society/dashboard")}>
//               HI {localStorage.getItem("name")?.toUpperCase()}
//             </Button>
//           ) : (
//             <Button onClick={() => navigate("/profile")}>
//               HI {localStorage.getItem("name")?.toUpperCase()}
//             </Button>
//           )
//         ) : (
//           <Button onClick={() => googleLogin()}>Sign in</Button>
//         )}
//         <ModeToggle />
//       </div>
//     </div>
//   ) : (
//     <div className="flex items-center p-2 mt-2 justify-between w-full">
//       <div className="flex space-x-5 items-center ml-16">
//         <a href="/">
//           <img src={Logo} alt="logo" className="w-10" />
//         </a>
//         <h1 className="text-3xl">ConnectHub</h1>
//       </div>
//       <div>
//         <ul className="flex space-x-9">
//           <NavLink
//             to="/"
//             className={({ isActive }) => {
//               return isActive ? "text-blue-500" : "";
//             }}
//           >
//             <li className="hover:text-blue-500">Home</li>
//           </NavLink>
//           <NavLink
//             to="/events"
//             className={({ isActive }) => {
//               return isActive ? "text-blue-500" : "";
//             }}
//           >
//             <li className="hover:text-blue-500">Events</li>
//           </NavLink>
//           <NavLink
//             to="/societies"
//             className={({ isActive }) => {
//               return isActive ? "text-blue-500" : "";
//             }}
//           >
//             <li className="hover:text-blue-500">Societies</li>
//           </NavLink>
//         </ul>
//       </div>
//       <div className="flex space-x-5 mr-16 justify-center">
//         {cookies.get("token") ? (
//           <Button onClick={() => navigate("/profile")}>
//             HI {localStorage.getItem("name")?.toUpperCase()}
//           </Button>
//         ) : (
//           <Button onClick={() => googleLogin()}>Sign in</Button>
//         )}
//         <ModeToggle />
//       </div>
//     </div>
//   );
// };

export default HomeNav;
