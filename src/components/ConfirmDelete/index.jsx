import { Box, Button, Layer, Text, TextArea, TextInput } from "grommet";
import { useContext, useState } from "react";
import { TaskContext } from "../../Context";
import { uuid } from "uuidv4";
import { api } from "../../services/api";

export function ConfirmDelete({
  open,
  closeModal,
  colId,
  task,
  index,
  disableItem,
}) {
  const { tasks, setTasks } = useContext(TaskContext);

  const handleRemoveCard = (index, colId) => {
    const clonedTasks = tasks.filter((task) => task.id === colId)[0];

    clonedTasks.cards.splice(index, 1);

    api.put(`/tasks/${colId}`, clonedTasks).then(() => {
      setTasks(tasks);
      closeModal();
      disableItem();
    });
  };
  return (
    <>
      {!!open && (
        <Box style={{ position: "absolute" }}>
          <Layer pad="medium" onEsc={closeModal} onClickOutside={closeModal}>
            <Box
              width="small"
              height="small"
              justify="center"
              align="center"
              margin="small"
              gap="medium"
            >
              <Text>
                Tem certeza que deseja remover a task <b>{task.title}</b>?
              </Text>
              <Button
                primary
                color="status-critical"
                label="Confirmar"
                onClick={() => handleRemoveCard(index, colId)}
              />
            </Box>
          </Layer>
        </Box>
      )}
    </>
  );
}
