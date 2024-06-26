import HomeNav from "./components/HomeNav";
import { Toaster } from "@/components/ui/sonner";
import { Outlet, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
// import { SpeedInsights } from "@vercel/speed-insights/react";
import store from "./store/store.ts";
function App() {
  const location = useLocation();
  const hideNavOnRoutes = ["/society", "/superadmin", "/eventdashboard"]; // add routes where you want to hide the nav

  const showNav = !hideNavOnRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  return (
    <Provider store={store}>
      {showNav && <HomeNav />}
      <Outlet />
      <Toaster />
      {/* <SpeedInsights /> */}
    </Provider>
  );
}

export default App;
