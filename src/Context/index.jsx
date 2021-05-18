import { createContext, useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

export const TaskContext = createContext({});

export function TaskStorePrivder({ children }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activedProject, setActivedProject] = useState(0);

  useEffect(() => {
    api
      .get("/projects")
      .then((response) => setProjects(response.data.projects));
  }, []);

  const handleSetTasks = useCallback((taskList) => {
    setTasks(taskList);
  }, []);

  const handleRemoveCard = (index, colId) => {
    const clonedTasks = tasks.filter((task) => task.id === colId)[0];
    clonedTasks.cards.splice(index, 1);
    api.put(`/tasks/${colId}`, clonedTasks);
    return setTasks(tasks);
  };
  
  async function tasksByProject(projectID) {
    setActivedProject({
      ...activedProject,
      id: projectID,
      title: projects.filter(project => project.id === projectID)[0].title
    });
    await api
      .get(`/tasks/${projectID}`)
      .then((response) => setTasks(response.data));
  }

  function resetTasks() {
    setTasks([]);
  }

  return (
    <TaskContext.Provider
      value={{
        projects,
        tasks,
        handleSetTasks,
        handleRemoveCard,
        setTasks,
        tasksByProject,
        resetTasks,
        activedProject,
        setProjects
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
