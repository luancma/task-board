import { useContext, useEffect } from "react";
import { Box, Heading, Main, Text } from "grommet";
import { Board } from "../components/Board";
import { TaskContext } from "../Context";
import { useHistory } from "react-router-dom";

export function ProjectPage() {
  const { projects } = useContext(TaskContext);
  let history = useHistory();

  const handleClick = (id) => {
    history.push(`/projeto/${id}`);
  };

  return (
    <Main>
      <Heading>Projetos</Heading>
      <Box direction="row" gap="medium">
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
    </Main>
  );
}
