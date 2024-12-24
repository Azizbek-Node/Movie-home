import "./App.css";
import { ContextProvider } from "./components/context";
import Router from "./routes";

function App() {
  return (
    <ContextProvider>
      <Router />
    </ContextProvider>
  );
}

export default App;
