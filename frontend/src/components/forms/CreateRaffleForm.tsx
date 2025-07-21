import { Calendar1 } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/kibo-ui/dropzone";
import { createRaffleSchema } from "@/utils/validationCreateRaffle";

const CreateRaffleForm = () => {
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    pixKey: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleSubmit = () => {
    const data = { ...formData, endDate, files };
    const validation = createRaffleSchema.safeParse(data);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0]?.toString();
        if (field) fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-semibold text-sm">
          Nome
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full border placeholder:text-sm p-2 rounded-sm text-sm outline-none"
          placeholder="Insira o nome da rifa"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="font-semibold text-sm">
          Descrição{" "}
          <span className="text-xs text-muted-foreground">(Opcional)</span>
        </label>
        <textarea
          name="description"
          id="description"
          placeholder="Insira a descrição da rifa"
          className="w-full border placeholder:text-sm p-2 rounded-sm text-sm outline-none"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="price" className="font-semibold text-sm">
          Preço
        </label>
        <input
          type="text"
          name="price"
          id="price"
          placeholder="Insira o preço da rifa"
          className="w-full border placeholder:text-sm p-2 rounded-sm text-sm outline-none"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
        {errors.price && <span className="text-red-500">{errors.price}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="quantity" className="font-semibold text-sm">
          Quantidade
        </label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          placeholder="Insira a quantidade de números por rifa"
          className="w-full border placeholder:text-sm p-2 rounded-sm text-sm outline-none"
          value={formData.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />
        {errors.quantity && (
          <span className="text-red-500">{errors.quantity}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="pixKey" className="font-semibold text-sm">
          Chave PIX
        </label>
        <input
          type="text"
          name="pixKey"
          id="pixKey"
          placeholder="Insira a chave PIX da rifa"
          className="w-full border placeholder:text-sm p-2 rounded-sm text-sm outline-none"
          value={formData.pixKey}
          onChange={(e) => handleChange("pixKey", e.target.value)}
        />
        {errors.pixKey && <span className="text-red-500">{errors.pixKey}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-semibold text-sm">
          Data de encerramento da rifa
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 text-muted-foreground justify-between"
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
                onClick={() => setEndDate(undefined)}
              >
                Limpar data
              </Button>
            )}
          </PopoverContent>
        </Popover>
        {errors.endDate && (
          <span className="text-red-500">{errors.endDate}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Imagem da rifa</label>
        <Dropzone
          accept={{ "image/*": [".jpg", ".jpeg", ".png", ".webp"] }}
          onDrop={handleDrop}
          src={files}
          maxSize={3 * 1024 * 1024}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
        {errors.image && <span className="text-red-500">{errors.image}</span>}
      </div>
    </div>
  );
};

export default CreateRaffleForm;
