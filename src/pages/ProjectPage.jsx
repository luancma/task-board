import { useContext, useState } from "react";
import { Box, Button, Heading, Main, Text } from "grommet";
import { TaskContext } from "../Context";
import { useHistory } from "react-router-dom";
import { CreateProject } from "../components/CreateProject";
import { AddCircle } from "grommet-icons";

export function ProjectPage() {
  const { projects } = useContext(TaskContext);
  const [createModal, setCreateModal] = useState(false);
  let history = useHistory();

  const handleClick = (id) => {
    history.push(`/projeto/${id}`);
  };

  const openModal = () => setCreateModal(true);

  const closeModal = () => setCreateModal(false);

  return (
    <>
      <CreateProject open={createModal} closeModal={closeModal} />
      <Main>
        <Box pad="medium">
          <Box direction="row" align="center" gap="medium">
            <Heading size="small">Projetos</Heading>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
              }}
              icon={<AddCircle size="medium" color="brand" />}
              onClick={() => openModal()}
            />
          </Box>

          <Box direction="row" gap="medium" width="100%">
            {projects.map((project) => (
              <Box
                onClick={() => handleClick(project.id)}
                key={project.id}
                width="small"
                height="small"
                border={{ color: "brand", size: "medium" }}
                align="center"
                justify="center"
                style={{
                  borderRadius: "0.5rem",
                }}
              >
                <Text>{project.title}</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Main>
    </>
  );
}
