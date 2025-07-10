import CardLogin from "@/components/forms/CardLogin";
import { useAuthQueries } from "@/hooks/useAuthQueries";
import { setUserData } from "@/utils/storage";
import VerificationStorage from "@/utils/verificationStorage";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const { loginMutation } = useAuthQueries();
  const navigate = useNavigate();

  const handleSubmit = (
    e: React.FormEvent,
    email: string,
    password: string
  ) => {
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
    <>
      <VerificationStorage />
      <div className="w-full h-screen flex items-center justify-center p-4 md:max-w-[25%] m-auto">
        <CardLogin
          onSubmit={handleSubmit}
          isPending={loginMutation.isPending}
        />
      </div>
    </>
  );
};

export default Login;
