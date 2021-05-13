import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProjectPage } from "../pages/ProjectPage";

export function Routers() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <ProjectPage />
        </Route>
      </Switch>
    </Router>
  );
}
