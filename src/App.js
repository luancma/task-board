import { QueryClientProvider } from "react-query";
import "./App.css";
import { Board } from "./components/Board";
import { TaskStorePrivder } from "./Context";
import { queryClient } from "./services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskStorePrivder>
        <Board />
      </TaskStorePrivder>
    </QueryClientProvider>
  );
}

export default App;
