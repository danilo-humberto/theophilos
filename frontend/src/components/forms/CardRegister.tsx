import { Eye, EyeOff, Loader, Lock, Mail, User } from "lucide-react";
import HeaderForm from "./HeaderForm";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Link } from "react-router";

interface UsersErrors {
  name?: string;
  email?: string;
  password?: string;
}

interface CardRegisterProps {
  userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: UsersErrors;
  onChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
}

const CardRegister = ({
  userData,
  errors,
  onChange,
  onSubmit,
  isPending,
}: CardRegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="bg-[#fff] rounded-sm w-full shadow-[2px_0px_15px_0px_rgba(0,0,0,0.1)] px-4">
      <HeaderForm
        title="Bem vindo ao Theophilos"
        description="Crie a sua conta para começar a comprar as rifas"
      />
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-sm">
            Nome
          </label>
          <div className="border border-sidebar-border rounded-sm p-2 w-full flex justify-between">
            <User size={20} className="text-muted-foreground" />
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Insira seu nome"
              className="w-full px-2 text-sm outline-none border-none"
              value={userData.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </div>
          {errors.name && (
            <span className="text-destructive text-[12px] px-2">
              {errors.name}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <div className="border border-sidebar-border rounded-sm p-2 w-full flex justify-between">
            <Mail size={18} className="text-muted-foreground" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@example.com"
              className="w-full px-2 text-sm outline-none border-none"
              value={userData.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>
          {errors.email && (
            <span className="text-destructive text-[12px] px-2">
              {errors.email}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-sm">
            Senha
          </label>
          <div className="border border-sidebar-border rounded-sm p-2 w-full flex justify-between">
            <Lock size={18} className="text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Insira a sua senha"
              className="w-full px-2 text-sm outline-none border-none"
              value={userData.password}
              onChange={(e) => onChange("password", e.target.value)}
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
          {errors.password && (
            <span className="text-destructive text-[12px] px-2">
              {errors.password}
            </span>
          )}
        </div>
        <Button variant="destructive" onClick={onSubmit} disabled={isPending}>
          {isPending && <Loader className="animate-spin" />} Criar Conta
        </Button>
      </form>

      <Separator className="my-4" />

      <div className="flex text-[14px] justify-center mb-4">
        <p className="text-muted-foreground">Já possui uma conta?</p>
        <Link to="/login" className="text-destructive ml-1">
          Entrar
        </Link>
      </div>
    </div>
  );
};

export default CardRegister;
