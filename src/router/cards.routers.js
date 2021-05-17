import { api } from "../services/api";

export function createTaskService({ taskID, task }) {
  api.post(`/tasks/${taskID}`, task)
}
