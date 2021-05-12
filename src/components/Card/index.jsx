import { Box, Button, Text } from "grommet";
import { Draggable } from "react-beautiful-dnd";
import { Close } from "grommet-icons";
import { useCallback, useEffect, useState } from "react";
import { ConfirmDelete } from "../ConfirmDelete";

export function Card({ id, index, colId, task }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [removed, setRemoved] = useState(false);

  const disable = () => setRemoved(true)

  if(removed){
    return null
  }

  return (
    <>
      <Draggable key={id} index={index} draggableId={`${colId}-${id}`}>
        {(provided) => (
          <Box
            pad="small"
            margin={{ vertical: "small", horizontal: "xsmall" }}
            border={{ color: "brand", size: "medium" }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Text size="small" weight="bold">
              {task.title}
            </Text>
            <Text size="small">{task.description}</Text>
            <Box gap="small" align="end">
              <Button
                onClick={async () => setConfirmDelete(true)}
                color="status-critical"
                style={{
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                label={<Close size="small" />}
              />
            </Box>
          </Box>
        )}
      </Draggable>
      <ConfirmDelete
        open={confirmDelete}
        closeModal={() => setConfirmDelete(false)}
        id={id}
        index={index}
        colId={colId}
        disableItem={disable}
        task={task}
      />
    </>
  );
}
