import Filters from "@/components/Filters";
import RequestCard from "@/components/RequestCard";

const Requests = () => {
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
        <RequestCard
          data={[
            {
              name: "Solicitação 1",
            },
          ]}
        />
        <RequestCard
          data={[
            {
              name: "Solicitação 1",
            },
          ]}
        />
        <RequestCard
          data={[
            {
              name: "Solicitação 1",
            },
          ]}
        />
        <RequestCard
          data={[
            {
              name: "Solicitação 1",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Requests;
