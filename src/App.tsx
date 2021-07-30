import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import TestReactHighlightWords from './pages/TestReactHighlightWords'

const PAGES = [
  'KeyboardNavigation',
  'PracticeReactContext',
  'TestUseRender',
  'TestUsePrevious',
  'TestUseCountUp',
  'TestSocketIo',
  'RenderLargeRealtimeList',
  'TestReactQuery',
  'TestReactTable',
  'TestFieldDependencyWithReactHookForm',
  'TestMaterialUI',
  'TestBlueprintJS',
  'TestModalAsAPage',
  'TestModalAsAPage_PageThatCanOpenAsAModal',
  'TestGuideModal',
  'ImplementDebounceAndThrottle',
  'TestIntroJs',
  // 'TestReactHighlightWords',
]

export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {PAGES.map((page, index) => (
            <li key={index}>
              <Link to={`/${page}`}>{page}</Link>
            </li>
          ))}
          <li>
            <Link to="/TestReactHighlightWords">TestReactHighlightWords</Link>
          </li>
        </ul>
      </nav>

      <Suspense fallback={null}>
        <Switch>
          {PAGES.map((page, index) => (
            <Route key={index} strict exact path={`/${page}`} component={lazy(() => import(`./pages/${page}`))} />
          ))}
          <Route strict exact path="/" component={TestReactHighlightWords} />
          {/* Home and Redirect */}
          <Route strict exact path="/" component={Home} />
          <Route component={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </Suspense>
    </Router>
  )
}
