import CardShimmer from "@/components/CardShimmer";
import CardSlider from "@/components/CardSlider";
import { Skeleton } from "@/components/ui/skeleton";
import { upcomingOrPast } from "@/lib/helper";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const UserDashBoard = () => {
  const currentDate = new Date().toDateString();
  const user = useSelector((store: RootState) => store.user.currentUser);
  const userRegistrations = useSelector(
    (store: RootState) => store.user.currentUserRegistrations
  );
  console.log(userRegistrations);
  return !user ? (
    <div className="rounded-xl p-5">
      <Skeleton className="h-10 w-[450px] mb-5" />
      <CardShimmer />
      <CardShimmer />
    </div>
  ) : (
    <div className="border shadow-2xl flex flex-col w-[90%] px-6 md:w-[70%] rounded-xl pt-5 mt-5">
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

      {!userRegistrations ? (
        <div className="my-5">
          <div className="flex flex-col my-2">
            <h2 className="text-xl font-semibold">Your Registrations</h2>
            <p className="text-lg text-red-500">No Registrations</p>
          </div>
        </div>
      ) : (
        <CardSlider
          title="Your Registrations"
          apply={false}
          itemsToMap={userRegistrations.filter((event) =>
            upcomingOrPast(event.end_date)
          )}
        />
      )}
      {!userRegistrations ? (
        <div className="my-5">
          <div className="flex flex-col my-2">
            <h2 className="text-xl font-semibold">Past Participations</h2>
            <p className="text-lg text-red-500">No Past Participations</p>
          </div>
        </div>
      ) : (
        <CardSlider
          title="Past Participations"
          apply={false}
          itemsToMap={userRegistrations.filter(
            (event) => !upcomingOrPast(event.end_date)
          )}
        />
      )}
    </div>
  );
};

export default UserDashBoard;
