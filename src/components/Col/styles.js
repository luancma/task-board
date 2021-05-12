import { Box } from "grommet";
import styled from "styled-components";

export const StyledBox = styled(Box)`
  width: 17rem;
  border-radius: 0.5rem;
  height: fit-content;
  min-height: 8rem;
`;

export const SDroppable = styled.div`
  margin-bottom: ${(props) => props.isDragging && "8rem"};
`;
