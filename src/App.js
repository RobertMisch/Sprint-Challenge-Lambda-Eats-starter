import React from "react";
import { Route, Switch } from "react-router-dom";

import Form from "./Form";
import Home from './Home';

const App = () => {
  return (
    <>
      <Switch>
	        <Route path="/Pizza">
	          <Form />
	        </Route>
	        <Route exact path="/">
	          <Home />
	        </Route>
	    </Switch>
    </>
  );
};
export default App;
