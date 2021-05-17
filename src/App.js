import "./App.css";
import { TaskStorePrivder } from "./Context";
import { Routers } from "./router";
import { makeServer } from "./services/mirage";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

function App() {
  return (
    <TaskStorePrivder>
      <Routers />
    </TaskStorePrivder>
  );
}

export default App;
