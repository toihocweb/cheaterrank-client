import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Lang from "./components/Assignment/Lang";
import Admin from "./components/Admin/Admin";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Admin} path="/admin" exact />
        <Route component={Lang} path="/:lang" exact />
        <Route render={(props) => <h1>Page Not Found</h1>} path="*" exact />
      </Switch>
    </Router>
  );
};

export default App;
