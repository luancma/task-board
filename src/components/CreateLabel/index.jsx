import { Box, Button, Layer, TextInput } from "grommet";
import { useContext, useState } from "react";
import { TaskContext } from "../../Context";
import { uuid } from "uuidv4";
import { api } from "../../services/api";

export function CreateLabel({ open, closeModal, cards, id, name }) {
  const { tasks, handleSetTasks } = useContext(TaskContext);
  const [value, setValue] = useState("");
  const createTask = () => {
    const prevList = {
      id: uuid(),
      status: id,
      title: `Title task ${Math.random()}`,
      description: `New task ${Math.random()}`,
    };

    const clonedTasks = tasks.filter((task) => task.id === id)[0];

    clonedTasks.cards.splice(1, 0, {
      id: uuid(),
      status: id,
      title: "Task Title",
      description: `New task ${Math.random()}`,
    });

    api.put(`/tasks/${id}`, clonedTasks).then(() => closeModal());
  };

  return (
    <>
      {!!open && (
        <Box>
          <Layer onEsc={closeModal} onClickOutside={closeModal}>
            <TextInput
              placeholder="Título"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <Button label="Criar" onClick={createTask} />
          </Layer>
        </Box>
      )}
    </>
  );
}
