import { Plus, Ticket } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import RafflesCard from "./RafflesCard";

interface ApresentationCardProps {
  title: string;
  description: string;
  role: string;
  raffles: any[];
}

const ApresentationCard = ({
  title,
  description,
  role,
  raffles,
}: ApresentationCardProps) => {
  const [roleUser, setRoleUser] = useState(role);
  const [data, setData] = useState(raffles);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground text-sm">{description}</p>
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
            <RafflesCard />
            <RafflesCard />
            <RafflesCard />
            <RafflesCard />
            <RafflesCard />
          </div>
        </>
      )}
    </>
  );
};

export default ApresentationCard;
