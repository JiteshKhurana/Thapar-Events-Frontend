import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Society from "./pages/Society";
import SocietyDetail from "./pages/SocietyDetail";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import HomeNav from "./components/HomeNav";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
import { Toaster } from "@/components/ui/sonner";
import Societyroot from "./pages/society/Societyroot";
import SocietyEvents from "./pages/society/SocietyEvents";
import SocietyDashboard from "./pages/society/SocietyDashboard";
import EditSocietyProfile from "./pages/society/EditSocietyProfile";

import EventDashboardRoot from "./pages/eventdashboard/EventDashboardRoot";
import EventDashboard from "./pages/eventdashboard/EventDashboard";
import ManageEventRegistrations from "./pages/eventdashboard/ManageEventRegistrations";
// import EventMarketingMails from "./pages/eventdashboard/EventMarketingMails";
// import EventReviews from "./pages/eventdashboard/EventReviews";
import EditEvent from "./pages/eventdashboard/EditEvent";
import EditRegistrationForm from "./pages/eventdashboard/EditRegistrationForm";
import EventsDetail from "./pages/EventsDetail";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <HomeNav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/events" element={<Events />} />
          <Route path="/events/:name" element={<EventsDetail />} />
          <Route path="/societies" element={<Society />} />
          <Route path="/societies/:name" element={<SocietyDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/user/:userid" element={<User />} />
          <Route path="/user/edit/:userid" element={<EditUser />} />
          <Route path="/society/" element={<Societyroot />}>
            <Route path="dashboard" element={<SocietyDashboard />}></Route>
            <Route path="societyevents" element={<SocietyEvents />}></Route>
            <Route path="editprofile" element={<EditSocietyProfile />}></Route>
          </Route>
          <Route path="/eventdashboard" element={<EventDashboardRoot />}>
            <Route path="" element={<EventDashboard />}></Route>
            <Route
              path="registrations"
              element={<ManageEventRegistrations />}
            ></Route>
            {/* <Route path="marketingmails" element={<EventMarketingMails/>} ></Route> */}
            {/* <Route path="reviews" element={<EventReviews/>} ></Route> */}
            <Route path="editevent" element={<EditEvent />}></Route>
            <Route
              path="editregistrationform"
              element={<EditRegistrationForm />}
            ></Route>
          </Route>
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
