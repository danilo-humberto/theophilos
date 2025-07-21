import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import CreateRaffleForm from "../forms/CreateRaffleForm";
import { DialogClose } from "@radix-ui/react-dialog";

const CreateRaffleDialog = () => {
  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline">
              Criar rifa <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[95vh] overflow-y-auto md:max-w-[700px]">
            <DialogHeader className="font-semibold text-xl">
              Criar uma nova Rifa
            </DialogHeader>
            <DialogDescription>
              Preencha os campos abaixo e clique em criar para criar uma nova
              rifa
            </DialogDescription>
            <CreateRaffleForm />
            <DialogFooter className="sm:justify-center">
              <DialogClose asChild>
                <Button type="submit" variant="reject" className="flex-1 h-10">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" variant="accept" className="flex-1 h-10">
                Criar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default CreateRaffleDialog;
