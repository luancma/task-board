import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export function Routers() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
