import { format } from "date-fns";
import { Check, Ticket, User, X } from "lucide-react";
import { Button } from "./ui/button";

interface RequestCardProps {
  data: any[];
}

const RequestCard = ({ data }: RequestCardProps) => {
  return (
    <>
      {data.length === 0 ? (
        <div className="rounded-sm h-52 w-full flex flex-col items-center justify-center">
          <Ticket width={40} height={40} className="text-sidebar-border" />
          <p className="font-semibold">Nenhuma solicitação encontrada</p>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 border border-sidebar-border border-l-amber-300 border-l-4 rounded-sm p-3">
          <h3 className="font-semibold text-xl">Rifa 1</h3>
          <div className="flex flex-col gap-1">
            <p className="flex items-center gap-1 text-muted-foreground text-sm">
              <User width={16} height={16} /> Danilo Humberto
            </p>
            <p className="text-muted-foreground text-sm">
              Solicitado: {format(new Date(), "dd/MM/yyyy")}
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" variant="accept">
              <Check /> Aceitar
            </Button>
            <Button className="flex-1" variant="reject">
              <X /> Recusar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestCard;
