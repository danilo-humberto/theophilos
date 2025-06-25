import ApresentationAllRafflesCard from "@/components/allRaffles/ApresentationAllRafflesCard";
import Filters from "@/components/Filters";

const AllRaffles = () => {
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ApresentationAllRafflesCard
        role="SELLER"
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
