import React from "react";
import RouterRoot from "./routes/RouterRoot";
import "./App.css";

export const AppContext = React.createContext<any>("");
function App() {
  return (
    <div className={"App"}>
      <RouterRoot />
    </div>
  );
}

export default App;
