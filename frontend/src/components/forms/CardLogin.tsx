import { Eye, EyeOff, Loader2 } from "lucide-react";
import HeaderForm from "./HeaderForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router";

interface Props {
  onSubmit: (e: React.FormEvent, email: string, password: string) => void;
  isPending?: boolean;
}

const CardLogin = ({ onSubmit, isPending }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-[#fff] rounded-sm w-full shadow-[2px_0px_15px_0px_rgba(0,0,0,0.1)] px-4">
      <HeaderForm
        title="Bem vindo de volta"
        description="Entre com suas credenciais para acessar a sua conta"
      />
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => onSubmit(e, email, password)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Insira seu email"
            className="border border-sidebar-border rounded-sm p-2 w-full text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-sm flex justify-between">
            <label htmlFor="password" className="font-semibold">
              Senha
            </label>
            <a href="#" className="text-destructive hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
          <div className="border border-sidebar-border rounded-sm p-2 w-full flex justify-between">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Insira sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm outline-none w-full border-none pr-2"
            />
            {showPassword ? (
              <EyeOff
                className="cursor-pointer text-muted-foreground"
                onClick={() => setShowPassword(false)}
                width={20}
                height={20}
              />
            ) : (
              <Eye
                className="cursor-pointer text-muted-foreground"
                onClick={() => setShowPassword(true)}
                width={20}
                height={20}
              />
            )}
          </div>
        </div>
        <Button
          className="w-full"
          variant="destructive"
          type="submit"
          disabled={isPending}
        >
          {isPending && <Loader2 className="mr-2 animate-spin" />}Entrar
        </Button>
      </form>

      <Separator className="my-4" />

      <div className="flex text-[14px] justify-center mb-4">
        <p className="text-muted-foreground">Ainda não possui uma conta?</p>
        <Link to="/register" className="text-destructive ml-1">
          Cadastrar
        </Link>
      </div>
    </div>
  );
};

export default CardLogin;
