import HistorySaleCards from "@/components/historyRequests/HistorySaleCards";
import SummaryByRaffleCard from "@/components/historyRequests/SummaryByRaffleCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChartLine,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

const RaffleHistory = () => {
  const [raffle, setRaffle] = useState<string | undefined>();

  const handleSelectChange = (value: string) => {
    if (value === "clear") {
      setRaffle(""); // volta ao placeholder
    } else {
      setRaffle(value);
    }
  };

  const raffles = Array.from({ length: 6 }, (_, index) => `Rifa ${index + 1}`);

  const [currentPage, setCurrentPage] = useState(1);
  const rafflesPerPage = 6;
  const totalPages = Math.ceil(raffles.length / rafflesPerPage);
  const paginetedRaffles = raffles.slice(
    (currentPage - 1) * rafflesPerPage,
    currentPage * rafflesPerPage
  );

  return (
    <>
      <div className="mt-4">
        <h2 className="text-2xl font-semibold">Histórico de Vendas</h2>
        <p className="text-muted-foreground text-sm">
          Acompanhe o desempenho de vendas das rifas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          <div className="border border-sidebar-border p-3 h-24 rounded-sm">
            <div className="flex flex-col gap-2 lg:flex-1">
              <h3 className="text-muted-foreground font-bold text-[15px]">
                Filtro por Rifa
              </h3>
              <Select value={raffle} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder="Selecione uma rifa"
                    className="text-sm"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rifa1">rifa1</SelectItem>
                  <SelectItem value="rifa2">rifa2</SelectItem>
                  <Separator />
                  <SelectItem value="clear" className="text-muted-foreground">
                    Limpar filtro
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <HistorySaleCards
            description="Total de vendas"
            values="100 números"
            icon={<ChartLine size={20} className="text-blue-500" />}
          />
          <HistorySaleCards
            description="Receita total"
            values={new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(1300)}
            icon={<DollarSign size={20} className="text-green-500" />}
          />
          <HistorySaleCards
            description="Total de Rifas Vendidas"
            values="5"
            icon={<Calendar size={20} className="text-purple-500" />}
          />
        </div>
        <div className="flex flex-col gap-4 w-full mt-4">
          <h3 className="font-semibold text-xl">Resumo de Vendas por Rifa</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {paginetedRaffles.map((raffle) => (
              <SummaryByRaffleCard key={raffle} />
            ))}
          </div>
        </div>
        {totalPages >= 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className="flex items-center gap-2 hover:underline disabled:opacity-50 text-foreground text-sm cursor-pointer"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ArrowLeft size={16} />
              <span>Anterior</span>
            </button>

            <span className="text-sm flex items-center gap-1">
              <strong>{currentPage}</strong> de <strong>{totalPages}</strong>{" "}
              páginas
            </span>

            <button
              className="flex items-center gap-2 hover:underline disabled:opacity-50 text-foreground text-sm cursor-pointer"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span>Próximo</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RaffleHistory;
