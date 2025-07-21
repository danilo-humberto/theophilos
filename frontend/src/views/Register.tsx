import CardRegister from "@/components/forms/CardRegister";
import { useAuthQueries } from "@/hooks/useAuthQueries";
import { userSchema } from "@/utils/validationRegisterForm";
import VerificationStorage from "@/utils/verificationStorage";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { registerMutation } = useAuthQueries();

  const handleChange = (field: string, value: string) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = userSchema.safeParse(userData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      console.log(result.error);
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    registerMutation.mutateAsync(userData, {
      onSuccess: () => {
        toast.success(
          "Conta criado com sucesso. Verifique seu e-mail para ativar sua conta."
        );
        navigate("/verify-email", { state: { email: userData.email } });
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Ocorreu um erro inesperado, tente novamente.");
        }
      },
    });
  };
  return (
    <>
      <VerificationStorage />
      <div className="w-full h-screen flex items-center justify-center p-4 md:max-w-[30%] m-auto">
        <CardRegister
          userData={userData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
          isPending={registerMutation.isPending}
        />
      </div>
    </>
  );
};

export default Register;
