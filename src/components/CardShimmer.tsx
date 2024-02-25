import { Skeleton } from "@/components/ui/skeleton";

const CardShimmer = () => {
  return (
    <div className="flex space-x-5 mb-5">
      {Array(3)
        .fill(0)
        .map(() => (
          <div>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-[300px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardShimmer;
