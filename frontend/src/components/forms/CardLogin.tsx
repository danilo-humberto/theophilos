import { Eye, EyeOff } from "lucide-react";
import HeaderForm from "./HeaderForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router";
import { useAuthQueries } from "@/hooks/useAuthQueries";
import { setUserData } from "@/utils/storage";
import { toast } from "sonner";
import axios from "axios";

const CardLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation } = useAuthQueries();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          const userData = {
            access_token: data.access_token,
            user: { ...data.user },
          };
          setUserData("user", userData);
          toast.success("Login realizado com sucesso!");
          navigate("/");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error("Credenciais inválidas!");
          } else {
            toast.error("Ocorreu um erro inesperado, tente novamente.");
          }
        },
      }
    );
  };

  return (
    <div className="bg-[#fff] rounded-sm w-full shadow-[2px_0px_15px_0px_rgba(0,0,0,0.1)] px-4">
      <HeaderForm
        title="Bem vindo de volta"
        description="Entre com suas credenciais para acessar a sua conta"
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        <Button className="w-full" variant="destructive" type="submit">
          Entrar
        </Button>
      </form>

      <Separator className="my-4" />

      <div className="flex text-[14px] justify-center mb-4">
        <p className="text-muted-foreground">Ainda não possui uma conta?</p>
        <a href="/register" className="text-destructive ml-1">
          Cadastrar
        </a>
      </div>
    </div>
  );
};

export default CardLogin;
