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
      {data.length === 0 ? (
        <div className="border border-sidebar-border px-3 py-5 rounded-sm h-52 w-full flex flex-col items-center justify-center">
          <Ticket width={40} height={40} className="text-sidebar-border" />
          <p className="font-semibold">Nenhuma rifa encontrada</p>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            {role === "LEADER" && (
              <CardAction>
                <Button variant="outline">
                  Criar rifa
                  <Plus />
                </Button>
              </CardAction>
            )}
          </CardHeader>
          <CardContent>
            <RafflesCard />
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ApresentationCard;
