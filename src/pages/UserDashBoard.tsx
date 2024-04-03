import CardShimmer from "@/components/CardShimmer";
import CardSlider from "@/components/CardSlider";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const UserDashBoard = () => {
  const user = useSelector((store: RootState) => store.user.currentUser);
  return !user ? (
    <div className="col-span-9 rounded-xl p-5">
      <Skeleton className="h-10 w-[450px] mb-5" />
      <CardShimmer />
      <CardShimmer />
    </div>
  ) : (
    <div className="col-span-9 rounded-xl p-5">
      <h1 className="text-3xl">Welcome back, {user.name}♥️!</h1>
      <CardSlider title="Registrations" apply={false} />
      <CardSlider title="Past Participations" apply={false} />
    </div>
  );
};

export default UserDashBoard;
