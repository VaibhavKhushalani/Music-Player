import Player from "./components/Player";
import { Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Route path="/" component={Player} />
    </>
  );
};

export default App;
