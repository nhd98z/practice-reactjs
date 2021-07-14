import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import KeyboardNavigation from './pages/KeyboardNavigation';
import PracticeReactContext from './pages/PracticeReactContext';
import TestUseRender from './pages/TestUseRender';
import TestUsePrevious from './pages/TestUsePrevious';
import TestUseCountUp from './pages/TestUseCountUp';
import TestSocketIo from './pages/TestSocketIo';
import RenderLargeRealtimeList from './pages/RenderLargeRealtimeList';
import TestReactQuery from './pages/TestReactQuery';

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/keyboard-navigation">Keyboard Navigation</Link>
          </li>
          <li>
            <Link to="/practice-react-context">Practice React Context</Link>
          </li>
          <li>
            <Link to="/test-use-render">Test useRender</Link>
          </li>
          <li>
            <Link to="/test-use-previous">Test usePrevious</Link>
          </li>
          <li>
            <Link to="/test-use-count-up">Test use-count-up</Link>
          </li>
          <li>
            <Link to="/test-socket-io">Test socket.io</Link>
          </li>
          <li>
            <Link to="/render-large-realtime-list">Render large real-time list</Link>
          </li>
          <li>
            <Link to="/test-react-query">Test react-query</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route strict path="/keyboard-navigation" component={KeyboardNavigation} />
        <Route strict path="/practice-react-context" component={PracticeReactContext} />
        <Route strict path="/test-use-render" component={TestUseRender} />
        <Route strict path="/test-use-previous" component={TestUsePrevious} />
        <Route strict path="/test-use-count-up" component={TestUseCountUp} />
        <Route strict path="/test-socket-io" component={TestSocketIo} />
        <Route strict path="/render-large-realtime-list" component={RenderLargeRealtimeList} />
        <Route strict path="/test-react-query" component={TestReactQuery} />
        {/* Home and Redirect */}
        <Route strict path="/" component={Home} />
        <Route component={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </Router>
  );
}
