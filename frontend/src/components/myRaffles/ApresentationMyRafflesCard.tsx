import { Plus, Ticket } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import MyRafflesCard from "./MyRafflesCard";

interface ApresentationMyRafflesCardProps {
  role: string;
  raffles: any[];
}

const ApresentationMyRafflesCard = ({
  role,
  raffles,
}: ApresentationMyRafflesCardProps) => {
  const [roleUser, setRoleUser] = useState(role);
  const [data, setData] = useState(raffles);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Minhas Rifas</h2>
          <p className="text-muted-foreground text-sm">
            Veja todas as rifas que você comprou
          </p>
        </div>
        {roleUser !== "SELLER" && (
          <Button variant="outline">
            Criar rifa <Plus />
          </Button>
        )}
      </div>
      {data.length === 0 ? (
        <div className="rounded-sm h-52 w-full flex flex-col items-center justify-center">
          <Ticket width={40} height={40} className="text-sidebar-border" />
          <p className="font-semibold">Nenhuma rifa encontrada</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <MyRafflesCard sold={15} total={40} />
            <MyRafflesCard sold={5} total={40} />
            <MyRafflesCard sold={30} total={40} />
          </div>
        </>
      )}
    </>
  );
};

export default ApresentationMyRafflesCard;
