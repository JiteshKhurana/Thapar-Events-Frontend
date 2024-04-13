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

export const timeConverter = (UNIX_timestamp: number, timeNeeded: boolean) => {
  const a = new Date(UNIX_timestamp * 1000);
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
  const sec = a.getSeconds();
  let time = "";
  timeNeeded
    ? (time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec)
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

export const upcomingOrPast = (end_date: number) => {
  const diffdates = findDifferenceTwoDates(Date.now() / 1000, end_date);
  if (diffdates >= 0) return 0;
  return 1;
};
