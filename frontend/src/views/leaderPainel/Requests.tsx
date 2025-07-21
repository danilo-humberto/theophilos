import Filters from "@/components/Filters";
import RequestCard from "@/components/RequestCard";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const Requests = () => {
  useAuthGuard();
  const requests = Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    title: `Rifa ${index + 1}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const rafflesPerPage = 6;
  const totalPages = Math.ceil(requests.length / rafflesPerPage);
  const paginetedRaffles = requests.slice(
    (currentPage - 1) * rafflesPerPage,
    currentPage * rafflesPerPage
  );
  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <div>
        <h2 className="text-2xl font-semibold">Solicitações Pendentes</h2>
        <p className="text-muted-foreground text-sm">
          Analise as solicitações das pessoas que querem pegar uma rifa.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {paginetedRaffles.map((request) => (
          <RequestCard key={request.id} data={[{ title: request.title }]} />
        ))}
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
  );
};

export default Requests;
