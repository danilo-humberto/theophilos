import ApresentationCard from "@/components/ApresentationCard";
import Filters from "@/components/Filters";

const MyRaffles = () => {
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ApresentationCard
        title="Minhas Rifas"
        description="Veja as rifas que você comprou"
        role="SELLER"
        raffles={[]}
      />
    </div>
  );
};

export default MyRaffles;
