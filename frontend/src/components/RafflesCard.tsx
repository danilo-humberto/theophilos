import { Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format } from "date-fns";

const RafflesCard = () => {
  return (
    <>
      <Card>
        <CardContent>
          <div className="relative rounded-tl-sm rounded-tr-sm overflow-hidden">
            <img
              src="https://picsum.photos/id/1/200/300"
              alt="teste"
              className="w-full h-[300px] object-cover brightness-50"
            />
            <Badge variant="sucess" className="absolute top-2 right-2">
              ATIVO
            </Badge>
          </div>
          <div className="p-3 flex flex-col gap-1">
            <p className="font-semibold">Rifa 1</p>
            <p className="text-muted-foreground text-sm max-w-[200px] truncate">
              descrição
            </p>
            <div className="flex items-center justify-between">
              <p className="flex gap-1 text-sm">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(0)}
                <span className="text-muted-foreground">/ número</span>
              </p>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar width={16} height={16} />
                <span>Até {format(new Date(), "dd/MM")}</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RafflesCard;
