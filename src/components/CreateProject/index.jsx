import { Box, Button, Heading, Layer, TextArea, TextInput } from "grommet";
import { useContext, useState } from "react";
import { TaskContext } from "../../Context";
import { uuid } from "uuidv4";
import { api } from "../../services/api";

export function CreateProject({ open, closeModal, cards, id, name }) {
  const { setProjects } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createProject = () => {
    const newProject = {
      id: uuid,
      title,
      description,
      tasks: [
        {
          id: "todo",
          name: "Todo",
          cards: [],
        },
        {
          id: "in_progress",
          name: "In Progress",
          cards: [],
        },
        {
          id: "done",
          name: "Done",
          cards: [],
        },
      ],
    };

    api.post(`/projects`, newProject).then((response) => {
      setTitle("");
      setDescription("");
      setProjects(response.data.projects);
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
              <Heading size="small">Novo Projeto</Heading>
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
                  onClick={createProject}
                />
                <Button color="status-critical" label="Cancelar" onClick={closeModal} />
              </Box>
            </Box>
          </Layer>
        </Box>
      )}
    </>
  );
}
