import { isLoggedIn, isAdmin } from "@/lib/helper";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  adminRoute?: boolean;
}

const ProtectedRoute = ({ adminRoute }: Props) => {
  const loggedin = isLoggedIn();
  const admin = isAdmin();
  if (!loggedin) return <Navigate to={"/"} />;
  if (!admin && adminRoute) return <Navigate to={"/"} />;
  if (admin && !adminRoute) return <Navigate to={"/"} />;
  return <Outlet />;
};

export default ProtectedRoute;
