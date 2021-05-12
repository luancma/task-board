import { Box, Button, Text } from "grommet";
import { useContext, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { TaskContext } from "../../Context";
import { api } from "../../services/api";
import { Card } from "../Card";
import { CreateLabel } from "../CreateLabel";
import { SDroppable, StyledBox } from "./styles";

export function Col({ id, name }) {
  const { tasks, setTasks } = useContext(TaskContext);

  const [open, setOpen] = useState(false);

  const handleOpenModal = () => setOpen(true);

  const handleCloseModal = () => setOpen(false);

  const handleRemove = (index) => {
    const { cards } = tasks.filter((task) => task.id === id)[0];
    cards.splice(index, 1);
    setTasks(tasks);
    api.put(`/tasks/${id}`, {
      id,
      name,
      cards,
    });
  };

  const { cards } = tasks.filter((task) => task.id === id)[0];


  console.log({cards})

  return (
    <>
      <StyledBox
        border={"all"}
        key={id}
        className="col"
        border={{ color: "brand", size: "medium" }}
        length={cards.length}
      >
        <Box
          direction="row"
          justify="between"
          align="baseline"
          pad="small"
          border={{
            color: "border",
            size: "small",
            style: "dashed",
            side: "bottom",
          }}
        >
          <Text color="brand" size="medium">
            {name}
          </Text>
          <Button onClick={handleOpenModal} primary label="+" />
        </Box>
        <Droppable droppableId={`${id}`}>
          {(provided, snapshot) => (
            <SDroppable
              isDragging={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="droppable-col"
            >
              {cards.map((task, index) => (
                <Card
                  key={index}
                  handleRemove={handleRemove}
                  id={task.id}
                  index={index}
                  colId={id}
                  task={task}
                />
              ))}
            </SDroppable>
          )}
        </Droppable>
      </StyledBox>
      <CreateLabel
        open={open}
        closeModal={handleCloseModal}
        cards={cards}
        id={id}
        name={name}
      />
    </>
  );
}
