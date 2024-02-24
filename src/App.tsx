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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <HomeNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/societies" element={<Society />} />
          <Route path="/societies/:name" element={<SocietyDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/user/:userid" element={<User />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
