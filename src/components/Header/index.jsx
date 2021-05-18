import { Header as GHeader, Button } from "grommet";
import { useHistory } from "react-router-dom";

export function HeaderBar() {
  const history = useHistory();

  return (
    <GHeader background="brand" pad="small">
      <Button
        size="medium"
        label="E-Board"
        style={{ border: "none" }}
        onClick={() => history.push("/")}
      />
    </GHeader>
  );
}
