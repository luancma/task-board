import { Box, Text } from "grommet";
import { Draggable } from "react-beautiful-dnd";

export function Card({ id, index, colId, task }) {
  return (
    <Draggable key={id} index={index} draggableId={`${colId}-${id}`}>
      {(provided) => (
        <Box
          pad="medium"
          margin={{ vertical: "small", horizontal: "xsmall" }}
          border={{ color: "brand", size: "medium" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Text size="small" weight="bold">{task.title}</Text>
          <Text size="small">{task.description}</Text>
        </Box>
      )}
    </Draggable>
  );
}
