import React from "react";
import RouterRoot from "./routes/RouterRoot";
import "./App.css";

export const AppContext = React.createContext<any>("");
function App() {
  const [searchValue, setSearchValue] = React.useState<string>("");
  return (
    <div className={"App"}>
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <RouterRoot />
      </AppContext.Provider>
    </div>
  );
}

export default App;
