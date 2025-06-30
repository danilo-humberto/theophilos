import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Separator } from "../ui/separator";

const CardVerifyEmail = () => {
  const [code, setCode] = useState("");

  const handleCodeChange = (event: any) => {
    const value = event.target.value;

    // Verifica se o valor contém apenas números (ou é vazio)
    if (/^\d*$/.test(value)) {
      setCode(value);
    }
  };
  return (
    <div className="bg-[#fff] rounded-sm w-full shadow-[2px_0px_15px_0px_rgba(0,0,0,0.1)] p-4">
      <div className="flex flex-col items-center gap-2 p-4">
        <div className="flex justify-center items-center bg-blue-100 w-12 h-12 rounded-full">
          <Mail size={25} className="text-blue-400" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="font-bold text-xl">Verifique seu email</h2>
          <p className="text-muted-foreground text-[12px] text-center">
            Nós enviamos um código de verificação para{" "}
            <span className="font-bold">user@exemaple.com</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-3">
        <label className="font-semibold text-sm">Código de Verificação</label>
        <input
          type="text"
          placeholder="000000"
          maxLength={6}
          value={code}
          onChange={handleCodeChange}
          className="border border-sidebar-border text-center outline-none rounded-sm p-2 appearance-none tracking-widest"
        />
        <p className="text-muted-foreground text-[10px] text-center">
          Digite os 6 dígitos enviados para o seu email
        </p>
      </div>
      <Button
        variant="destructive"
        className="w-full"
        disabled={code.length != 6}
      >
        Verificar Email
      </Button>

      <Separator className="mt-4" />

      <div className="flex flex-col gap-2 text-sm items-center mt-4">
        <p className="text-muted-foreground">Não recebeu o código?</p>
        <Button variant="outline" className="w-full">
          Reenviar
        </Button>
      </div>

      <div className="text-center flex justify-center">
        <a
          href="/register"
          className="text-muted-foreground flex gap-1 mt-4 text-[12px] items-center"
        >
          <ArrowLeft size={16} />
          <span>Voltar para o cadastro</span>
        </a>
      </div>
    </div>
  );
};

export default CardVerifyEmail;
