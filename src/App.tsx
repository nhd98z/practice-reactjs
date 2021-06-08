import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import KeyboardNavigation from "./pages/KeyboardNavigation";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/keyboard-navigation">Keyboard Navigation</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route strict path="/keyboard-navigation">
            <KeyboardNavigation />
          </Route>
          <Route strict path="/">
            <Home />
          </Route>
          <Route>
            <Redirect to={{ pathname: "/" }} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
