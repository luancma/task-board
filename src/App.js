import { Box } from "grommet";
import "./App.css";
import { Board } from "./components/Board";
import { TaskStorePrivder } from "./Context";

function App() {
  return (
    <TaskStorePrivder>
      <Board />
    </TaskStorePrivder>
  );
}

export default App;
