import { uuid } from "uuidv4";

export const db = {
  tasks: [
    {
      slug: "todo",
      name: "Todo",
      cards: [
        {
          id: uuid(),
          description: "New task from todo 1",
          status: "todo",
        },
        {
          id: uuid(),
          description: "New task from todo 2",
          status: "todo",
        },
      ],
    },
    {
      slug: "in progress",
      name: "In progress",
      cards: [
        {
          id: uuid(),
          description: "New task from in progress 1",
          status: "in progress",
        },
        {
          id: uuid(),
          description: "New task from in progress 2",
          status: "in progress",
        },
        {
          id: uuid(),
          description: "New task from in progress 3",
          status: "in progress",
        },
      ],
    },
    {
      slug: "done",
      name: "Done",
      cards: [
        {
          id: uuid(),
          description: "New task from done 1",
          status: "done",
        },
      ],
    },
  ],
};
