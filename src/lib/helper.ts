import Cookies from "universal-cookie";

export const isLoggedIn = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  if (token != null) return true;
  else return false;
};

export const isAdmin = () => {
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  if (id != null && role == "admin") return true;
  else return false;
};
