import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Lang from "./components/Assignment/Lang";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Lang} path="/:lang" exact />
      </Switch>
    </Router>
  );
};

export default App;
