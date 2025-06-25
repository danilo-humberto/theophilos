import { DialogTitle } from "@/components/ui/dialog";

interface MyRafflesDialogProps {
  sold: number;
}

const MyRafflesDialog = ({ sold }: MyRafflesDialogProps) => {
  return (
    <>
      <DialogTitle>iPhone 15 Pro Max Rifa</DialogTitle>
      <div className="border border-sidebar-border p-3 rounded-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        <div>
          <p className="text-muted-foreground text-[12px]">Preço por número</p>
          <span className="text-[15px] font-semibold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(5)}
          </span>
        </div>
        <div>
          <p className="text-muted-foreground text-[12px]">Total de números</p>
          <span className="text-[15px] font-semibold">40</span>
        </div>
        <div>
          <p className="text-muted-foreground text-[12px]">Números vendidos</p>
          <span className="text-[15px] font-semibold">0</span>
        </div>
        <div>
          <p className="text-muted-foreground text-[12px]">Valor vendido</p>
          <span className="text-[15px] font-semibold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(0)}
          </span>
        </div>
      </div>
      <div className="bg-sky-100 p-3 rounded-sm">
        <p className="text-sm text-sky-600">
          <span className="text-sky-800 font-bold">Instruções</span>: Clique nos
          números para selecionar eles. Após selecionar os números, você pode
          adicionar informações do comprador.
        </p>
      </div>
    </>
  );
};

export default MyRafflesDialog;
