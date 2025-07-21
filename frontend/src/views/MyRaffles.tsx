import Filters from "@/components/Filters";
import ApresentationMyRafflesCard from "@/components/myRaffles/ApresentationMyRafflesCard";
import { useAuthGuard } from "@/hooks/useAuthGuard";

const MyRaffles = () => {
  useAuthGuard();
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ApresentationMyRafflesCard
        role="SELLER"
        raffles={[{ name: "rifa 1" }]}
      />
    </div>
  );
};

export default MyRaffles;
