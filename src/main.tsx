import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Society from "./pages/Society";
import SocietyDetail from "./pages/SocietyDetail";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
// import Societyroot from "./pages/society/Societyroot";
// import SocietyEvents from "./pages/society/SocietyEvents";
// import SocietyDashboard from "./pages/society/SocietyDashboard";
// import EditSocietyProfile from "./pages/society/EditSocietyProfile";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

// import EventDashboardRoot from "./pages/eventdashboard/EventDashboardRoot";
// import EventDashboard from "./pages/eventdashboard/EventDashboard";
// import ManageEventRegistrations from "./pages/eventdashboard/ManageEventRegistrations";
// import EventMarketingMails from "./pages/eventdashboard/EventMarketingMails";
// import EventReviews from "./pages/eventdashboard/EventReviews";
// import EditEvent from "./pages/eventdashboard/EditEvent";
// import EditRegistrationForm from "./pages/eventdashboard/EditRegistrationForm";
import EventsDetail from "./pages/EventsDetail";
import UserDashBoard from "./pages/UserDashBoard.tsx";
import Page404 from "./pages/Page404.tsx";

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
        path: "/events/:name",
        element: <EventsDetail />,
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
        path: "/profile",
        element: <User />,
        children: [
          {
            path: "/profile",
            element: <UserDashBoard />,
          },
          {
            path: "/profile/editprofile",
            element: <EditUser />,
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

//       <Route path="/society/" element={<Societyroot />}>
//         <Route path="dashboard" element={<SocietyDashboard />}></Route>
//         <Route path="societyevents" element={<SocietyEvents />}></Route>
//         <Route path="editprofile" element={<EditSocietyProfile />}></Route>
//       </Route>
//       <Route path="/eventdashboard" element={<EventDashboardRoot />}>
//         <Route path="" element={<EventDashboard />}></Route>
//         <Route
//           path="registrations"
//           element={<ManageEventRegistrations />}
//         ></Route>
// {/* <Route path="marketingmails" element={<EventMarketingMails/>} ></Route> */}
//         {/* <Route path="reviews" element={<EventReviews/>} ></Route> */}
//         <Route path="editevent" element={<EditEvent />}></Route>
//         <Route
//           path="editregistrationform"
//           element={<EditRegistrationForm />}
//         ></Route>

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="401427703030-n1bmmd93k7ag77sneqgmrujc99429t7l.apps.googleusercontent.com">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
