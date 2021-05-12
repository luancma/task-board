import { createContext, useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { api } from "../services/api";

export const TaskContext = createContext({});

export function TaskStorePrivder({ children }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((response) => setTasks(response.data));
  }, []);

  const handleSetTasks = useCallback((taskList) => {
    console.log(taskList);
    setTasks(taskList);
  }, []);

  const handleRemoveCard = (index, colId) => {
   const clonedTasks = tasks.filter((task) => task.id === colId)[0];
    clonedTasks.cards.splice(index, 1);
    console.log(tasks)
    api.put(`/tasks/${colId}`, clonedTasks);
    return setTasks(tasks); 
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        handleSetTasks,
        handleRemoveCard,
        setTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
