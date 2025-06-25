import { Calendar, DollarSign, Pin } from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import MyRafflesDialog from "./dialog/MyRafflesDialog";

interface MyRafflesCardProps {
  sold: number;
  total: number;
}

const MyRafflesCard = ({ sold, total }: MyRafflesCardProps) => {
  const percent = Math.min(100, Math.round((sold / total) * 100));
  return (
    <div className="w-full flex flex-col gap-4 border border-sidebar-border border-l-green-300 border-l-4 rounded-sm p-5">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-xl truncate">
          iPhone 15 Pro Max Raffle
        </h3>
        <Badge variant="sucess">ATIVO</Badge>
      </div>
      <p className="text-muted-foreground text-sm">descrição da rifa</p>
      <div className="flex gap-14">
        <div className="flex items-center gap-2">
          <Pin width={20} height={20} className="text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-sm">Meus números</p>
            <span className="font-semibold">0 - 40</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign
            width={20}
            height={20}
            className="text-muted-foreground"
          />
          <div>
            <p className="text-muted-foreground text-sm">Valor vendido</p>
            <span className="font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(0)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Calendar width={20} height={20} className="text-muted-foreground" />
        <span className="text-muted-foreground text-sm">
          Encerra em: {format(new Date(), "dd/MM/yyyy")}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground text-sm">Números vendidos</p>
          <span className="text-muted-foreground text-sm">
            {sold} / {total}
          </span>
        </div>
        <Progress value={percent} className="[&>div]:bg-green-500" />
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Ver Meus Números</Button>
        </DialogTrigger>
        <DialogContent>
          <MyRafflesDialog sold={sold} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyRafflesCard;
