import { Box, Heading, Main, Text } from "grommet";
import { Board } from "../components/Board";

export function ProjectPage() {
  return (
    <Main>
      <Heading>Projetos</Heading>
      <Box
        width="small"
        height="small"
        border={{ color: "brand", size: "medium" }}
        align="center"
        justify="center"
        style={{
            borderRadius: "0.5rem"
        }}
      >
        <Text>Projeto de teste</Text>
      </Box>
      <Board />
    </Main>
  );
}
