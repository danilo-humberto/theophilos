import { useLocation } from "react-router";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import RoutesApp from "./routes";

function App() {
  const { pathname } = useLocation();
  return (
    <>
      {!["/login", "/register", "/verify-email"].includes(pathname) && (
        <Header />
      )}
      <RoutesApp />
      {!["/login", "/register", "/verify-email"].includes(pathname) && (
        <Footer />
      )}
    </>
  );
}

export default App;
