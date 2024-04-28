import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
// import { Analytics } from "@vercel/analytics/react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import Events from "./pages/Events";
import SocietyDetail from "./pages/SocietyDetail";
import User from "./pages/user/User.tsx";
import EditUser from "./pages/user/EditUser.tsx";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import EventsDetail from "./pages/EventsDetail";
import UserDashBoard from "./pages/user/UserDashBoard.tsx";
import Page404 from "./pages/Page404.tsx";
import UserEventRegister from "./pages/user/UserEventRegister.tsx";
import ProtectedRoute from "./protectedRoutes/ProtectedRoute.tsx";
import SocietyEvents from "./pages/society/SocietyEvents.tsx";
import EditSocietyProfile from "./pages/society/EditSocietyProfile.tsx";
import EditEvent from "./pages/eventdashboard/EditEvent.tsx";
import ManageEventRegistrations from "./pages/eventdashboard/ManageEventRegistrations.tsx";
import EditRegistrationForm from "./pages/eventdashboard/EditRegistrationForm.tsx";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard.tsx";
import SuperAdminRoot from "./pages/superadmin/SuperAdminRoot.tsx";
import CreateNewEvent from "./pages/society/CreateNewEvent.tsx";
import EventDashboard from "./pages/eventdashboard/EventDashboard.tsx";
import Society from "./pages/Society.tsx";
import AddEventPoster from "./pages/eventdashboard/AddEventPoster.tsx";
import SuperAdminDashboardSocieties from "./pages/superadmin/SuperAdminDashboardSocieties.tsx";
import SuperAdminDashboardAddSociety from "./pages/superadmin/SuperAdminDashboardAddSociety.tsx";
import Feedback from "./pages/Feedback.tsx";
import AddPhotoGallery from "./pages/eventdashboard/AddPhotoGallery.tsx";
import EventGallery from "./pages/EventGallery.tsx";
import SuperAdminDashboardSocietyProfile from "./pages/superadmin/SuperAdminDashboardSocietyProfile.tsx";
import SocietyRoot from "./pages/society/Societyroot.tsx";
import SocietyDashboard from "./pages/society/SocietyDashboard.tsx";
import EventDashboardRoot from "./pages/eventdashboard/EventDashboardRoot.tsx";
import SuperAdminDashboardApproveSociety from "./pages/superadmin/SuperAdminDashboardApproveSociety.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import SuperAdminDashboardEditSocietyProfile from "./pages/superadmin/SuperAdminDashboardEditSocietyProfile.tsx";
import TermsAndConditions from "./pages/TermsAndConditions.tsx";

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
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/termsandconditions",
        element: <TermsAndConditions />,
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
        path: "/events/:name/:eventId/eventgallery",
        element: <EventGallery />,
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
        path: "/societies/:societyName",
        element: <SocietyDetail />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
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
            element: <SocietyRoot />,
            children: [
              {
                path: "",
                element: <SocietyDashboard />,
              },
              {
                path: "/society/societyevents",
                element: <SocietyEvents />,
              },

              {
                path: "/society/editprofile",
                element: <EditSocietyProfile />,
              },

              {
                path: "/society/createevent",
                element: <CreateNewEvent />,
              },
            ],
          },
        ],
      },
      {
        path: "/eventdashboard/:eventId",
        element: <ProtectedRoute adminRoute={true} superAdminRoute={true} />,
        children: [
          {
            path: "/eventdashboard/:eventId",
            element: <EventDashboardRoot />,
            children: [
              {
                path: "",
                element: <EventDashboard />,
              },
              {
                path: "registrations",
                element: <ManageEventRegistrations />,
              },
              {
                path: "editevent",
                element: <EditEvent />,
              },
              {
                path: "eventposter",
                element: <AddEventPoster />,
              },
              {
                path: "eventgallery",
                element: <AddPhotoGallery />,
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
        element: <ProtectedRoute adminRoute={false} superAdminRoute={true} />,
        children: [
          {
            path: "/superadmin",
            element: <SuperAdminRoot />,
            children: [
              {
                path: "",
                element: <SuperAdminDashboard />,
              },
              {
                path: "/superadmin/societies",
                element: <SuperAdminDashboardSocieties />,
              },
              {
                path: "/superadmin/societies/:societyId",
                element: <SuperAdminDashboardSocietyProfile />,
              },
              {
                path: "/superadmin/societies/:societyId/editsociety",
                element: <SuperAdminDashboardEditSocietyProfile />,
              },
              {
                path: "/superadmin/addsociety",
                element: <SuperAdminDashboardAddSociety />,
              },
              {
                path: "/superadmin/approvesociety",
                element: <SuperAdminDashboardApproveSociety />,
              },
            ],
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
    <GoogleOAuthProvider clientId="704308074982-724hg3p0iocfsftpd3hrvdp8uaeoe3ev.apps.googleusercontent.com">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Analytics /> */}
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
