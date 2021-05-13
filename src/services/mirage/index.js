import { createServer, Model, Factory } from "miragejs";

export function makeServer() {
  const server = createServer({
    models: {
      task: Model.extend(),
    },

    seeds(server) {
      server.create("task", {
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
      });
      server.create("task", {
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
      });
      server.create("task", {
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
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/tasks");

      this.put("/tasks/:id", (schema, request) => {
        const tasks = schema.tasks.find(request.params.id);
        const cards = JSON.parse(request.requestBody).cards
        return tasks.update({
          cards
        });
      });
    },
  });

  return server;
}
