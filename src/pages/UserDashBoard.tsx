import CardShimmer from "@/components/CardShimmer";
import CardSlider from "@/components/CardSlider";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const UserDashBoard = () => {
  const currentDate = new Date().toDateString();
  const user = useSelector((store: RootState) => store.user.currentUser);
  return !user ? (
    <div className="rounded-xl p-5">
      <Skeleton className="h-10 w-[450px] mb-5" />
      <CardShimmer />
      <CardShimmer />
    </div>
  ) : (
    <div className="border shadow-2xl flex flex-col w-[90%] px-6 md:w-[70%]  rounded-xl pt-5 mt-5">
      <div className="welcome flex flex-col">
        <span className="text text-gray-500 font-semibold dark:text-gray-200 text-md">
          {currentDate}
        </span>
        <span className="flex flex-wrap gap-2 text text-gray-700 dark:text-gray-400 text-2xl">
          Welcome back
          <span className="text-black dark:text-white text-4xl font-semibold">
            {user.name}! ♥️
          </span>
        </span>
      </div>
      <CardSlider title="Your Registrations" apply={false} />
      <CardSlider title="Past Participations" apply={false} />
    </div>
  );
};

export default UserDashBoard;
