import CardVerifyEmail from "@/components/forms/CardVerifyEmail";
import { useAuthQueries } from "@/hooks/useAuthQueries";
import { setUserData } from "@/utils/storage";
import VerificationStorage from "@/utils/verificationStorage";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const VerifyEmail = () => {
  const { verifyEmailMutation, resendVerificationEmail } = useAuthQueries();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent, email: string, token: string) => {
    e.preventDefault();

    verifyEmailMutation.mutateAsync(
      { email, token },
      {
        onSuccess: (data) => {
          const userData = {
            access_token: data.access_token,
            user: { ...data.user },
          };
          setUserData("user", userData);
          toast.success("Conta ativada com sucesso!");
          navigate("/");
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
          } else {
            toast.error("Ocorreu um erro inesperado, tente novamente.");
          }
        },
      }
    );
  };

  const handleResendSubmit = (e: React.FormEvent, email: string) => {
    e.preventDefault();
    console.log(email);
    resendVerificationEmail.mutateAsync(
      { email },
      {
        onSuccess: () => {
          toast.success(
            "Verificação enviada com sucesso. Verifique seu e-mail para ativar sua conta."
          );
        },
        onError: (error) => {
          if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
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
        <CardVerifyEmail
          onSubmit={handleSubmit}
          isPending={verifyEmailMutation.isPending}
          onResendSubmit={handleResendSubmit}
          isPendingResend={resendVerificationEmail.isPending}
        />
      </div>
    </>
  );
};

export default VerifyEmail;
