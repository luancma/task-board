import { Box, Button, Layer, Text } from "grommet";
import { useContext } from "react";
import { TaskContext } from "../../Context";
import { api } from "../../services/api";

export function ConfirmDelete({
  open,
  closeModal,
  colId,
  task,
  index,
  disableItem,
}) {
  const { tasks, setTasks, activedProject } = useContext(TaskContext);

  const handleRemoveCard = (index, colId) => {
    const clonedTasks = tasks.filter((task) => task.id === colId)[0];

    clonedTasks.cards.splice(index, 1);

    api
      .put(`/tasks/${colId}`, {
        projectId: activedProject.id,
        newList: clonedTasks,
      })
      .then(() => {
        setTasks(tasks);
        closeModal();
        disableItem();
      });
  };

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
              margin="small"
              gap="medium"
              width="medium"
              height="medium"
              pad="medium"
            >
              <Text>
                Tem certeza que deseja remover a task <b>{task.title}</b>?
              </Text>

              <Box direction="row" gap="medium">
                <Button
                  primary
                  color="status-critical"
                  label="Confirmar"
                  onClick={() => handleRemoveCard(index, colId)}
                />
                <Button primary label="Cancelar" onClick={closeModal} />
              </Box>
            </Box>
          </Layer>
        </Box>
      )}
    </>
  );
}
