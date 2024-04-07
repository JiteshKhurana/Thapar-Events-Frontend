import HomeNav from "./components/HomeNav";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
// import { SpeedInsights } from "@vercel/speed-insights/react";
import store from "./store/store.ts";
function App() {
  return (
    <Provider store={store}>
      <HomeNav />
      <Outlet />
      <Toaster />
      {/* <SpeedInsights /> */}
    </Provider>
  );
}

export default App;
