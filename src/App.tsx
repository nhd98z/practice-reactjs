import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import KeyboardNavigation from './pages/KeyboardNavigation'
import PracticeReactContext from './pages/PracticeReactContext'
import TestUseRender from './pages/TestUseRender'
import TestUsePrevious from './pages/TestUsePrevious'
import TestUseCountUp from './pages/TestUseCountUp'

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
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route strict path="/keyboard-navigation" component={KeyboardNavigation} />
        <Route strict path="/practice-react-context" component={PracticeReactContext} />
        <Route strict path="/test-use-render" component={TestUseRender} />
        <Route strict path="/test-use-previous" component={TestUsePrevious} />
        <Route strict path="/test-use-count-up" component={TestUseCountUp} />

        {/* Home and Redirect */}
        <Route strict path="/" component={Home} />
        <Route component={() => <Redirect to={{ pathname: '/' }} />} />
      </Switch>
    </Router>
  )
}
