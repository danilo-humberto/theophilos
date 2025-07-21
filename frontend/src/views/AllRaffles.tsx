import ApresentationAllRafflesCard from "@/components/allRaffles/ApresentationAllRafflesCard";
import Filters from "@/components/Filters";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { getUserData } from "@/utils/storage";

const AllRaffles = () => {
  useAuthGuard();
  const user = getUserData("user");
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ApresentationAllRafflesCard
        role={user?.user?.role || "SELLER"}
        raffles={[]}
      />
    </div>
  );
};

export default AllRaffles;
