import { Loader2, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { useLocation } from "react-router";

interface Props {
  onSubmit: (e: React.FormEvent, email: string, code: string) => void;
  onResendSubmit: (e: React.FormEvent, email: string) => void;
  isPending?: boolean;
  isPendingResend?: boolean;
}

const CardVerifyEmail = ({
  onSubmit,
  isPending,
  onResendSubmit,
  isPendingResend,
}: Props) => {
  const [code, setCode] = useState("");
  const location = useLocation();
  const { email } = (location.state as { email: string }) || {};

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
          <h2 className="font-bold text-xl">Verifique seu e-mail</h2>
          <p className="text-muted-foreground text-[12px] text-center">
            Nós enviamos um código de verificação para <strong>{email}</strong>
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
        disabled={code.length != 6 || isPending}
        onClick={(e) => {
          onSubmit(e, email.trim(), code.trim());
          setCode("");
        }}
      >
        {isPending && <Loader2 className="animate-spin" />}Verificar Email
      </Button>

      <Separator className="mt-4" />

      <div className="flex flex-col gap-2 text-sm items-center mt-4">
        <p className="text-muted-foreground">Não recebeu o código?</p>
        <Button
          variant="outline"
          className="w-full"
          onClick={(e) => onResendSubmit(e, email.trim())}
          disabled={isPendingResend}
        >
          {isPendingResend ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>Reenviar</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CardVerifyEmail;
