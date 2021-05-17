import { createServer, Model, Factory } from "miragejs";
import uuid from "uuidv4";

export function makeServer() {
  const server = createServer({
    models: {
      project: Model.extend(),
      task: Model.extend(),
    },

    seeds(server) {
      server.create("project", {
        id: uuid,
        title: "Projeto 1",
        description: "Primeiro projeto",
        tasks: [
          {
            id: "todo",
            name: "Todo",
            cards: [
              {
                id: "983956b6-e2b3-426b-8b0a-15b51a0dcd10",
                status: "todo",
                title: "Task",
                description: "dasdasdasdasdasdasdas",
              },
            ],
          },
          {
            id: "in_progress",
            name: "In Progress",
            cards: [
              {
                id: "983956b6-e2b3-426b-8b0a-15dqw51a0dc8b0",
                status: "in_progress",
                title: "Title",
                description: "dasdasdasdasdasdasdas",
              },
            ],
          },
          {
            id: "done",
            name: "Done",
            cards: [
              {
                id: "983956b6-2f21-426b-8b0a-15b51a0dc8b0",
                status: "Done",
                title: "Title",
                description: "dasdasdasdasdasdasdas",
              },
            ],
          },
        ],
      });

      server.create("project", {
        title: "Projeto 2",
        id: uuid,
        description: "Segundo Projeto",
        tasks: [
          {
            id: "todo",
            name: "Todo",
            cards: [
              {
                id: "983956b6-e2b3-426b-8b0a-15b51a0dcd10",
                status: "todo",
                title: "Task",
                description: "dasdasdasdasdasdasdas",
              },
            ],
          },
          {
            id: "in_progress",
            name: "In Progress",
            cards: [
              {
                id: "983956b6-e2b3-426b-8b0a-15dqw51a0dc8b0",
                status: "in_progress",
                title: "Title",
                description: "dasdasdasdasdasdasdas",
              },
            ],
          },
          {
            id: "done",
            name: "Done",
            cards: [
              {
                id: "983956b6-2f21-426b-8b0a-15b51a0dc8b0",
                status: "Done",
                title: "Title",
                description: "dasdasdasdasdasdasdas",
              },
            ],
          },
        ],
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/projects");

      this.get("/tasks/:id", (schema, request) => {
        const tasks = schema.projects.findBy({ id: request.params.id });
        return tasks.attrs.tasks;
      });

      this.put("/tasks/:id", (schema, request) => {
        const requestBody = JSON.parse(request.requestBody);

        const project = schema.projects.findBy({
          id: requestBody.projectId,
        }).attrs;

        const tasksListToUpdate = project.tasks.map((taskList) => {
          if (taskList.id === requestBody.newList.id) {
            return requestBody.newList;
          }
          return taskList;
        });

        schema.projects
          .findBy({
            id: requestBody.projectId,
          })
          .update(requestBody.newList.id, {
            tasks: tasksListToUpdate,
          });
      });

      this.post("/tasks/:id", (schema, request) => {
        const tasks = schema.tasks.find(request.params.id);
        const newTask = JSON.parse(request.requestBody);
        console.log(newTask);
      });
    },
  });

  return server;
}
