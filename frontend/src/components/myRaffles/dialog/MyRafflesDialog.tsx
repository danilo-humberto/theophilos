import { DialogFooter, DialogTitle } from "@/components/ui/dialog";
import NumbersGrid from "./NumbersGrid";
import { CircleCheckBig, Phone, Receipt, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/kibo-ui/dropzone";

interface MyRafflesDialogProps {
  sold: number;
  total: number;
}

const MyRafflesDialog = ({ total }: MyRafflesDialogProps) => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const toggleNumber = (number: number) => {
    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number]
    );
  };
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
      <div>
        <h4 className="font-semibold">Cartela</h4>
        <NumbersGrid
          total={total}
          selected={selectedNumbers}
          onSelect={toggleNumber}
        />
      </div>
      {selectedNumbers.length > 0 && (
        <>
          <div className="border border-sidebar-border p-3 rounded-sm flex flex-col gap-1">
            <h4 className="flex items-center gap-2 text-sm">
              <CircleCheckBig
                width={16}
                height={16}
                className="text-destructive"
              />
              <span>Números selecionados</span>
            </h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedNumbers.map((n) => (
                <span
                  key={n}
                  className="bg-destructive text-white px-2 py-0.5 text-xs rounded"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-sidebar-border p-3 flex flex-col gap-3 rounded-sm">
            <h4 className="flex items-center gap-2 text-md font-semibold mb-3">
              <Receipt width={16} height={16} />
              <span>Informações do comprador</span>
            </h4>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1 text-[12px] font-semibold">
                <User width={16} height={16} />
                <span>Nome do Comprador</span>
              </label>
              <input
                type="text"
                className="w-full border border-sidebar-border p-2 rounded-sm text-sm"
                placeholder="Nome do comprador"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1 text-[12px] font-semibold">
                <Phone width={16} height={16} />
                <span>Telefone do Comprador</span>
              </label>
              <input
                type="text"
                className="w-full border border-sidebar-border p-2 rounded-sm text-sm"
                placeholder="Telefone do comprador"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-1 text-[12px] font-semibold">
                <Receipt width={16} height={16} />
                <span>Print do Comprovante</span>
              </label>
              <Dropzone
                accept={{ "image/*": [] }}
                onDrop={handleDrop}
                onError={console.error}
                src={files}
              >
                <DropzoneEmptyState />
                <DropzoneContent />
              </Dropzone>
            </div>
            <Separator />
            <DialogFooter className="flex-row">
              <DialogClose asChild>
                <Button variant="outline" className="flex-1">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" variant="destructive" className="flex-1">
                Salvar
              </Button>
            </DialogFooter>
          </div>
        </>
      )}
    </>
  );
};

export default MyRafflesDialog;
