import Footer from "./components/Footer";
import HomeNav from "./components/HomeNav";
import { Toaster } from "@/components/ui/sonner";
// import Societyroot from "./pages/society/Societyroot";
// import SocietyEvents from "./pages/society/SocietyEvents";
// import SocietyDashboard from "./pages/society/SocietyDashboard";
// import EditSocietyProfile from "./pages/society/EditSocietyProfile";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.ts";

// import EventDashboardRoot from "./pages/eventdashboard/EventDashboardRoot";
// import EventDashboard from "./pages/eventdashboard/EventDashboard";
// import ManageEventRegistrations from "./pages/eventdashboard/ManageEventRegistrations";
// import EventMarketingMails from "./pages/eventdashboard/EventMarketingMails";
// import EventReviews from "./pages/eventdashboard/EventReviews";
// import EditEvent from "./pages/eventdashboard/EditEvent";
// import EditRegistrationForm from "./pages/eventdashboard/EditRegistrationForm";

function App() {
  return (
    <Provider store={store}>
      <HomeNav />
      <Outlet />
      <Toaster />
      <Footer />
    </Provider>
  );
}

export default App;
