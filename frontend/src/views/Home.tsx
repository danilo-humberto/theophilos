import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllRaffles from "./AllRaffles";
import MyRaffles from "./MyRaffles";
import Requests from "./leaderPainel/Requests";
import RaffleHistory from "./leaderPainel/RaffleHistory";
import { getUserData } from "@/utils/storage";

const Home = () => {
  const user = getUserData("user");
  return (
    <main className="px-4 py-6 w-full h-auto lg:max-w-[1220px] lg:mx-auto">
      <Tabs defaultValue="allRaffles">
        <TabsList className="w-full overflow-x-auto md:overflow-x-visible">
          <TabsTrigger
            value="allRaffles"
            className="text-gray-400 pl-2 hover:text-ring hover:border-b hover:border-b-ring transition-all duration-300"
          >
            Todas as Rifas
          </TabsTrigger>
          <TabsTrigger
            value="myRaffles"
            className="text-gray-400 pl-2 hover:text-ring hover:border-b hover:border-b-ring transition-all duration-300"
          >
            Minhas Rifas
          </TabsTrigger>
          {user?.user?.role !== "SELLER" && user && (
            <>
              <TabsTrigger
                value="requests"
                className="text-gray-400 pl-2 hover:text-ring hover:border-b hover:border-b-ring transition-all duration-300"
              >
                Solicitações
                <span className="w-5 h-5 bg-destructive rounded-full text-background text-[10px] flex items-center justify-center">
                  10
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="text-gray-400 pl-2 hover:text-ring hover:border-b hover:border-b-ring transition-all duration-300"
              >
                Histórico
              </TabsTrigger>
            </>
          )}
        </TabsList>
        <TabsContent value="allRaffles">
          <AllRaffles />
        </TabsContent>
        <TabsContent value="myRaffles">
          <MyRaffles />
        </TabsContent>
        {user?.user?.role !== "SELLER" && user && (
          <>
            <TabsContent value="requests">
              <Requests />
            </TabsContent>
            <TabsContent value="history">
              <RaffleHistory />
            </TabsContent>
          </>
        )}
      </Tabs>
    </main>
  );
};

export default Home;
