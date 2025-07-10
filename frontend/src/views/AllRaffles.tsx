import ApresentationAllRafflesCard from "@/components/allRaffles/ApresentationAllRafflesCard";
import Filters from "@/components/Filters";
import { getUserData } from "@/utils/storage";

const AllRaffles = () => {
  const user = getUserData("user");
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ApresentationAllRafflesCard
        role={user?.user?.role || "SELLER"}
        raffles={[
          {
            name: "rifa 1",
          },
        ]}
      />
    </div>
  );
};

export default AllRaffles;
