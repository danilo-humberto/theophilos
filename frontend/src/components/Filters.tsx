import { Calendar1, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";

const Filters = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const handleSelectChange = (value: string) => {
    if (value === "clear") {
      setStatus(""); // volta ao placeholder
    } else {
      setStatus(value);
    }
  };

  return (
    <div className="border border-sidebar-border px-3 py-5 rounded-sm mt-4 w-full flex flex-col gap-2 lg:flex-row">
      <div className="flex flex-col gap-2 lg:flex-1">
        <h3 className="text-muted-foreground font-bold">
          Data início / Data final
        </h3>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 text-muted-foreground"
              >
                {startDate ? format(startDate, "dd/MM/yyyy") : "dd/mm/aaaa"}
                <Calendar1 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center gap-2">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                captionLayout="dropdown"
              />
              {startDate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setStartDate(undefined)}
                >
                  Limpar data
                </Button>
              )}
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 text-muted-foreground"
              >
                {endDate ? format(endDate, "dd/MM/yyyy") : "dd/mm/aaaa"}
                <Calendar1 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center gap-2">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                captionLayout="dropdown"
              />
              {endDate && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setStartDate(undefined)}
                >
                  Limpar data
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col gap-2 lg:flex-1">
        <h3 className="text-muted-foreground font-bold">Status</h3>
        <Select value={status} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="closed">Fechado</SelectItem>
            <Separator />
            <SelectItem value="clear" className="text-muted-foreground">
              Limpar filtro
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 lg:flex-1">
        <h3 className="text-muted-foreground font-bold">Pesquisar</h3>
        <div className="flex items-center gap-2 border border-sidebar-border rounded-md p-2">
          <Search className="text-ring" width={20} height={20} />
          <input
            type="text"
            placeholder="Pesquisar rifas..."
            className="placeholder:text-sm outline-none w-full text-muted-foreground text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
