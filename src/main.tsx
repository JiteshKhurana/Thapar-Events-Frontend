import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Society from "./pages/Society";
import SocietyDetail from "./pages/SocietyDetail";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import EventsDetail from "./pages/EventsDetail";
import UserDashBoard from "./pages/UserDashBoard.tsx";
import Page404 from "./pages/Page404.tsx";
import UserEventRegister from "./pages/eventdashboard/UserEventRegister.tsx";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute.tsx";
import Societyroot from "./pages/society/Societyroot.tsx";
import SocietyDashboard from "./pages/society/SocietyDashboard.tsx";
import SocietyEvents from "./pages/society/SocietyEvents.tsx";
import EditSocietyProfile from "./pages/society/EditSocietyProfile.tsx";
import EventDashboardRoot from "./pages/eventdashboard/EventDashboardRoot.tsx";
import EditEvent from "./pages/eventdashboard/EditEvent.tsx";
import ManageEventRegistrations from "./pages/eventdashboard/ManageEventRegistrations.tsx";
import EditRegistrationForm from "./pages/eventdashboard/EditRegistrationForm.tsx";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard.tsx";
import SuperAdminRoot from "./pages/superadmin/SuperAdminRoot.tsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:name/:eventId",
        element: <EventsDetail />,
      },
      {
        path: "/events/:name/:eventId/register",
        element: <UserEventRegister />,
      },
      {
        path: "/societies",
        element: <Society />,
      },
      {
        path: "/societies/:societyName/:societyId",
        element: <SocietyDetail />,
      },
      {
        path: "/profile",
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <User />,
            children: [
              {
                path: "",
                element: <UserDashBoard />,
              },
              {
                path: "/profile/editprofile",
                element: <EditUser />,
              },
            ],
          },
        ],
      },
      // Society Routes (Protected)
      {
        path: "/society",
        element: <ProtectedRoute adminRoute={true} />,
        children: [
          {
            path: "/society",
            element: <Societyroot />,
            children: [
              {
                path: "dashboard",
                element: <SocietyDashboard />,
              },
              {
                path: "societyevents",
                element: <SocietyEvents />,
              },

              {
                path: "editprofile",
                element: <EditSocietyProfile />,
              },
            ],
          },
        ],
      },
      {
        path: "/eventdashboard",
        element: <ProtectedRoute adminRoute={true} />,
        children: [
          {
            path: "/eventdashboard",
            element: <EventDashboardRoot />,
            children: [
              {
                path: "registrations",
                element: <ManageEventRegistrations />,
              },
              {
                path: "editevent",
                element: <EditEvent />,
              },
              {
                path: "editregistrationform",
                element: <EditRegistrationForm />,
              },
            ],
          },
        ],
      },
      {
        path: "/superadmin",
        element: <SuperAdminRoot />,
        children: [
          {
            path: "/superadmin",
            element: <SuperAdminDashboard />,
          },
        ],
      },
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="401427703030-n1bmmd93k7ag77sneqgmrujc99429t7l.apps.googleusercontent.com">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Analytics /> */}
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
