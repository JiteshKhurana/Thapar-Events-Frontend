import { isLoggedIn, isAdmin, isSuperAdmin, isUser } from "@/lib/helper";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  adminRoute?: boolean;
  superAdminRoute?: boolean;
}

const checkAccess = (
  user: boolean,
  admin: boolean,
  superAdmin: boolean,
  adminRoute?: boolean,
  superAdminRoute?: boolean
) => {
  if (user && (adminRoute || superAdminRoute)) return false;
  if (admin && superAdminRoute && !adminRoute) return false;
  if (superAdmin && !superAdminRoute && !adminRoute) return false;
  if ((admin || superAdmin) && !adminRoute && !superAdminRoute) return false;
  return true;
};

const ProtectedRoute = ({ adminRoute, superAdminRoute }: Props) => {
  const loggedin = isLoggedIn();
  if (!loggedin) return <Navigate to={"/"} />;

  const user = isUser();
  const admin = isAdmin();
  const superadmin = isSuperAdmin();

  const hasAccess = checkAccess(
    user,
    admin,
    superadmin,
    adminRoute,
    superAdminRoute
  );
  if (!hasAccess) return <Navigate to={"/"} />;

  return <Outlet />;
};

export default ProtectedRoute;
