import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { Navigation } from "./components/navigation";
import "./index.css";
// import "animate.css";

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <>
      {/* <Navigation /> */}
      <div className="dark">{routing}</div>
    </>
  );
};

export default App;
