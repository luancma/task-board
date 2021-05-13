import "./App.css";
import { TaskStorePrivder } from "./Context";
import { Routers } from "./router";

function App() {
  return (
    <TaskStorePrivder>
      <Routers />
    </TaskStorePrivder>
  );
}

export default App;
