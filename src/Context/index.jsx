import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const TaskContext = createContext({});

export function TaskStorePrivder({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((response) => setTasks(response.data));
  }, []);

  function handleSetTasks(taskList) {
    return setTasks(taskList);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        handleSetTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
