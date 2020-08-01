import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Lang from "./components/Assignment/Lang";
import Admin from "./components/Admin/Admin";
import Login from "./components/Login/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Login} path="/login" />
        <Route component={Admin} path="/admin" />
        <Route component={Lang} path="/:lang" />
        <Route render={(props) => <h1>Page Not Found</h1>} path="*" exact />
      </Switch>
    </Router>
  );
};

export default App;
