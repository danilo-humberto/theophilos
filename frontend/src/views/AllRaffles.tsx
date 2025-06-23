import ApresentationCard from "@/components/ApresentationCard";
import Filters from "@/components/Filters";

const AllRaffles = () => {
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ApresentationCard
        title="Todas as Rifas"
        description="Veja todas as rifas disponíveis"
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
