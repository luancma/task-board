import { Box, Button, Heading, Layer, TextArea, TextInput } from "grommet";
import { useContext, useState } from "react";
import { TaskContext } from "../../Context";
import { uuid } from "uuidv4";
import { api } from "../../services/api";

export function CreateLabel({ open, closeModal, cards, id, name }) {
  const { tasks, handleSetTasks, activedProjectID } = useContext(TaskContext);
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

    api
      .put(`/tasks/${id}`, {
        projectId: activedProjectID,
        newList: clonedTasks,
      })
      .then(() => {
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
          <Layer
            pad="medium"
            onEsc={closeModal}
            onClickOutside={closeModal}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              justify="center"
              align="center"
              gap="small"
              width="medium"
              margin="medium"
              pad="small"
            >
              <Heading size="small">Nova Tarefa</Heading>
              <TextInput
                responsive
                placeholder="Título"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <TextArea
                responsive
                placeholder="Descrição"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <Box direction="row" gap="medium">
                <Button
                  disabled={validateCreateButton()}
                  label="Criar"
                  onClick={createTask}
                />
                <Button
                  label="Cancelar"
                  onClick={closeModal}
                />
              </Box>
            </Box>
          </Layer>
        </Box>
      )}
    </>
  );
}
