import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Board } from "../components/Board";
import { HeaderBar } from "../components/Header";
import { ProjectPage } from "../pages/ProjectPage";

export function Routers() {
  return (
    <>
      <Router>
      <HeaderBar />
        <Switch>
          <Route path="/" exact component={ProjectPage} />
          <Route path="/projeto/:id" exact component={Board} />
        </Switch>
      </Router>
    </>
  );
}
