import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Society from "./pages/Society";
import SocietyDetail from "./pages/SocietyDetail";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";

// <<<<<<< societyDashboard

// import Societyroot from "./pages/society/Societyroot";
// import SocietyEvents from "./pages/society/SocietyEvents";
// import SocietyDashboard from "./pages/society/SocietyDashboard";
// import EditSocietyProfile from "./pages/society/EditSocietyProfile";
// // import 'boxicons'



// function App() {
//     return (
//         <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/events" element={<Events />} />
//                     <Route path="/societies" element={<Society />} />
//                     <Route path="/societies/:name" element={<SocietyDetail />} />
//                     <Route path="/contact-us" element={<ContactUs />} />
//                     <Route path="/society/" element={<Societyroot/>}>
//                         <Route path="dashboard" element={<SocietyDashboard/>}></Route> 
//                         <Route path="societyevents" element={<SocietyEvents/>}></Route> 
//                         <Route path="editprofile" element={<EditSocietyProfile/>}></Route> 
//                     </Route>
//                 </Routes>
//                 <Footer />
//             </BrowserRouter>
//         </ThemeProvider>
//     );
// =======
import HomeNav from "./components/HomeNav";
import User from "./pages/User";
import EditUser from "./pages/EditUser";
import { Toaster } from "@/components/ui/sonner";
import Societyroot from "./pages/society/Societyroot";
import SocietyEvents from "./pages/society/SocietyEvents";
import SocietyDashboard from "./pages/society/SocietyDashboard";
import EditSocietyProfile from "./pages/society/EditSocietyProfile";
import EventDashboardRoot from "./pages/eventdashboard/EventDashboardRoot";
// import 'boxicons'


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <HomeNav />
        <Routes>
          <Route path="/" element={<Home />} > 
          
          </Route>
          <Route path="/events" element={<Events />} />
          <Route path="/societies" element={<Society />} />
          <Route path="/societies/:name" element={<SocietyDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/user/:userid" element={<User />} />
          <Route path="/user/edit/:userid" element={<EditUser />} />
          <Route path="/society/" element={<Societyroot/>}>
              <Route path="dashboard" element={<SocietyDashboard/>}></Route> 
              <Route path="societyevents" element={<SocietyEvents/>}></Route> 
          </Route>
          <Route path="editsocietyprofile" element={<EditSocietyProfile/>}></Route> 
          <Route path="/eventdashboard" element={<EventDashboardRoot/>}>
            <Route path="registrations" ></Route>
            <Route path="marketingmails"></Route>
            <Route path="reviews"></Route>
            <Route path="editevent"></Route>
            <Route path="registrationform"></Route>
          </Route>
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
// >>>>>>> main
}

export default App;
