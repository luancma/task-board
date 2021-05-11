import { useState } from "react";
import { db } from "../utils/db";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export function Board() {
  const [tasks, setTasks] = useState(db.tasks);

  const handleDrag = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    const result = Array.from(tasks);

    const movedCardOrigin = result.filter(
      (result) => result.slug === source.droppableId
    )[0].cards;

    const newDeckOrigin = result.filter(
      (result) => result.slug === destination.droppableId
    )[0].cards;

    const movedCard = movedCardOrigin[source.index];

    movedCardOrigin.splice(source.index, 1);

    newDeckOrigin.splice(destination.index, 0, movedCard);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDrag}>
        {tasks.map((row, index) => {
          return (
            <div key={row.slug} className="col">
              <h1>{row.name}</h1>
              <Droppable droppableId={`${row.slug}`}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable-col"
                    >
                      {row.cards.map((task, index) => {
                        return (
                          <Draggable
                            key={task.id}
                            index={index}
                            draggableId={`${row.slug}-${task.id}`}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {task.description}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
