import { useContext, useEffect, useState } from "react";
import { Box, Heading, Main } from "grommet";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router";
import { TaskContext } from "../Context";
import { api } from "../services/api";
import { Col } from "./Col";
import { CreateProject } from "./CreateProject";
export function Board() {
  const { id } = useParams();
  const { tasks, tasksByProject, resetTasks, activedProject } =
    useContext(TaskContext);
  useEffect(() => {
    tasksByProject(id);

    return () => {
      return resetTasks();
    };
  }, [id]);

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
      (result) => result.id === source.droppableId
    )[0].cards;

    const newDeckOrigin = result.filter(
      (result) => result.id === destination.droppableId
    )[0].cards;

    let movedCard = movedCardOrigin[source.index];

    movedCard = {
      ...movedCard,
      status: destination.droppableId,
    };

    movedCardOrigin.splice(source.index, 1);

    newDeckOrigin.splice(destination.index, 0, movedCard);

    const destinationToUpdate = result.filter(
      (item) => item.id === destination.droppableId
    )[0];

    const sourceToUpdate = result.filter(
      (item) => item.id === source.droppableId
    )[0];

    api.put(`/tasks/${source.droppableId}`, {
      projectId: id,
      newList: sourceToUpdate,
    });

    api.put(`/tasks/${destination.droppableId}`, {
      projectId: id,
      newList: destinationToUpdate,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <Main overflow="auto" style={{ height: "97vh" }}>
        <Box pad={{ horizontal: "medium" }}>
          <Heading size="small">{activedProject.title}</Heading>
        </Box>
        <Box gap="small" direction="row" pad="medium">
          {tasks.map((row) => {
            return <Col id={row.id} name={row.name} cards={row.cards} />;
          })}
        </Box>
      </Main>
    </DragDropContext>
  );
}
