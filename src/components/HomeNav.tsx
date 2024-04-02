import Logo from "../assets/tietlogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "./ui/button.tsx";
import { ModeToggle } from "./mode-toggle.tsx";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const HomeNav: React.FC = () => {
  const cookies = new Cookies(null, { path: "/" });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      axios
        .post(
          "https://thapar-event-management-system-production.up.railway.app/create",
          {
            email: userInfo.data.email,
            name: userInfo.data.name,
            token: tokenResponse.access_token,
          }
        )
        .then((resp) => {
          const decoded = jwtDecode(resp.data.token);
          cookies.set("token", resp.data.token, {
            expires: decoded.exp ? new Date(decoded.exp * 1000) : undefined,
          });
          if (resp.data.user) {
            localStorage.setItem("name", resp.data.user.name);
            localStorage.setItem("user_id", resp.data.user._id);
            localStorage.setItem("role", resp.data.user.role);
          } else {
            localStorage.setItem("name", resp.data.society.name);
            localStorage.setItem("id", resp.data.society._Uid);
            localStorage.setItem("role", resp.data.society.role);
          }

          window.location.reload();
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
    <div className="absolute z-10 flex items-center p-2 mt-2 justify-between w-full">
      <div className="flex space-x-5 items-center ml-16">
        <a href="/">
          <img src={Logo} alt="logo" className="w-10" />
        </a>
        <h1 className="text-white text-3xl">Invincible</h1>
      </div>
      <div>
        <ul className="flex space-x-9 text-white">
          <Link to="/">
            <li className="hover:text-blue-600">Home</li>
          </Link>
          <Link to="/events">
            <li className="hover:text-blue-600">Events</li>
          </Link>
          <Link to="/societies">
            <li className="hover:text-blue-600">Societies</li>
          </Link>
        </ul>
      </div>
      <div className="flex space-x-5 mr-16 justify-center">
        {cookies.get("token") ? (
          localStorage.getItem("role") === "admin" &&
          localStorage.getItem("id") ? (
            <Button onClick={() => navigate("/society/dashboard")}>
              HI {localStorage.getItem("name")?.toUpperCase()}
            </Button>
          ) : (
            <Button
              onClick={() =>
                navigate("/user/" + localStorage.getItem("user_id"))
              }
            >
              HI {localStorage.getItem("name")?.toUpperCase()}
            </Button>
          )
        ) : (
          <Button onClick={() => googleLogin()}>Sign in</Button>
        )}
        <ModeToggle />
      </div>
    </div>
  ) : (
    <div className="flex items-center p-2 mt-2 justify-between w-full">
      <div className="flex space-x-5 items-center ml-16">
        <a href="/">
          <img src={Logo} alt="logo" className="w-10" />
        </a>
        <h1 className="text-3xl">Invincible</h1>
      </div>
      <div>
        <ul className="flex space-x-9">
          <Link to="/">
            <li className="hover:text-blue-600">Home</li>
          </Link>
          <Link to="/events">
            <li className="hover:text-blue-600">Events</li>
          </Link>
          <Link to="/societies">
            <li className="hover:text-blue-600">Societies</li>
          </Link>
        </ul>
      </div>
      <div className="flex space-x-5 mr-16 justify-center">
        {cookies.get("token") ? (
          <Button
            onClick={() => navigate("/user/" + localStorage.getItem("user_id"))}
          >
            HI {localStorage.getItem("name")?.toUpperCase()}
          </Button>
        ) : (
          <Button onClick={() => googleLogin()}>Sign in</Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default HomeNav;
