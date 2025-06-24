const SummaryByRaffleCard = () => {
  return (
    <div className="border border-sidebar-border w-full border-l-blue-500 border-l-4 p-3 rounded-sm flex flex-col gap-2">
      <h4 className="font-semibold">Rifa 1</h4>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">Números vendidos:</p>
          <span className="font-semibold">55</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">Receita:</p>
          <span className="font-semibold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(0)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">Vendas:</p>
          <span className="font-semibold">1</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryByRaffleCard;
