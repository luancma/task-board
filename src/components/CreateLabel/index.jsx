import { Box, Button, Layer, TextArea, TextInput } from "grommet";
import { useContext, useState } from "react";
import { TaskContext } from "../../Context";
import { uuid } from "uuidv4";
import { api } from "../../services/api";

export function CreateLabel({ open, closeModal, cards, id, name }) {
  const { tasks, handleSetTasks } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const createTask = () => {
    const clonedTasks = tasks.filter((task) => task.id === id)[0];

    clonedTasks.cards.splice(1, 0, {
      id: uuid(),
      status: id,
      title,
      description,
    });

    api.put(`/tasks/${id}`, clonedTasks).then(() => {
      setTitle("");
      setDescription("");
      closeModal();
    });
  };

  const validateCreateButton = () =>
    !title.trim().length || !description.trim().length;

  return (
    <>
      {!!open && (
        <Box style={{ position: "absolute" }}>
          <Layer pad="medium" onEsc={closeModal} onClickOutside={closeModal}>
            <Box
              width="medium"
              height="medium"
              justify="center"
              align="center"
              margin="small"
              gap="medium"
            >
              <TextInput
                placeholder="Título"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextArea
                placeholder="Descrição"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <Button
                disabled={validateCreateButton()}
                label="Criar"
                onClick={createTask}
              />
            </Box>
          </Layer>
        </Box>
      )}
    </>
  );
}
