import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllRaffles from "./AllRaffles";
import MyRaffles from "./MyRaffles";

const Home = () => {
  return (
    <main className="px-4 py-6 w-full h-auto lg:max-w-[1120px] lg:mx-auto">
      <Tabs defaultValue="allRaffles">
        <TabsList className="w-full">
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
        </TabsList>
        <TabsContent value="allRaffles">
          <AllRaffles />
        </TabsContent>
        <TabsContent value="myRaffles">
          <MyRaffles />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Home;
