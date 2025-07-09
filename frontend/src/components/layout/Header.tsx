import { ChevronsUpDownIcon, User } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { getUserData, removeUserData } from "@/utils/storage";
import { toast } from "sonner";

const Header = () => {
  const user = getUserData("user");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    removeUserData("user");
    toast.success("Logout realizado com sucesso!");
    navigate("/");
  };

  return (
    <header className="max-w-full p-4 border-b border-b-accent shadow-sm sticky top-0 z-50 bg-background">
      <div className="flex items-center justify-between lg:max-w-[1200px] lg:mx-auto">
        <div className="flex items-center gap-2">
          <img
            src="./logo.jpg"
            alt="logo do theophilos"
            className="w-10 h-10"
          />{" "}
          <h1 className="text-1xl font-bold hidden lg:block">Theophilos</h1>
        </div>
        {user?.access_token ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                aria-expanded={open}
                className="cursor-pointer"
              >
                <span className="flex items-center justify-center bg-accent w-7 h-7 rounded-full">
                  <User />
                </span>
                <p>{user?.user?.name}</p>
                <ChevronsUpDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 mr-10 p-2">
              <ul className="flex flex-col gap-2">
                <li
                  onClick={() => logout()}
                  className="cursor-pointer hover:bg-accent p-2"
                >
                  <span>Sair</span>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Entrar
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
