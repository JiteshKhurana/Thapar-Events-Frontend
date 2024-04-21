import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export const isLoggedIn = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  if (token != null) {
    const decoded = jwtDecode<JwtPayload>(token);
    const expirationDate = decoded.exp
      ? new Date(decoded.exp * 1000)
      : new Date();
    // Check if token is expired
    if (expirationDate > new Date()) {
      return true;
    }
  } else return false;
};

interface JwtPayload extends DefaultJwtPayload {
  User_type?: string;
  Email?: string;
  Name?: string;
  Uid?: string;
  exp?: number;
}

export const getRole = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  if (token != null) {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.User_type;
  }
  return null;
};

export const isUser = () => {
  const role = getRole();
  return role === "user";
};

export const isAdmin = () => {
  const role = getRole();
  return role === "admin";
};

export const isSuperAdmin = () => {
  const role = getRole();
  return role === "superadmin";
};

export const timeConverter = (UNIX_timestamp: Date, timeNeeded: boolean) => {
  const a = new Date(Number(UNIX_timestamp) * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  // const sec = a.getSeconds();
  let time = "";
  timeNeeded
    ? (time = date + " " + month + " " + year + ", " + hour + ":" + min)
    : (time = date + " " + month + " " + year + " ");

  return time;
};

export const findDifferenceTwoDates = (
  UNIX_timestamp1: number,
  UNIX_timestamp2: number
) => {
  const diff = (UNIX_timestamp1 - UNIX_timestamp2) * 1000;
  return Math.floor(diff / (24 * 60 * 60 * 1000));
};

export const upcomingOrPast = (end_date: Date) => {
  const diffdates = findDifferenceTwoDates(Date.now() / 1000, Number(end_date));
  if (diffdates >= 0) return 0;
  return 1;
};
