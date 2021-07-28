import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'

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
  'TestFieldDependencyWithFormik',
  'TestMaterialUI',
  'TestBlueprintJS',
  'TestModalAsAPage',
  'TestModalAsAPage_PageThatCanOpenAsAModal',
  'TestGuideModal',
  'ImplementDebounceByMyself',
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
        </ul>
      </nav>

      <Suspense fallback={null}>
        <Switch>
          {PAGES.map((page, index) => (
            <Route key={index} strict exact path={`/${page}`} component={lazy(() => import(`./pages/${page}`))} />
          ))}
          {/* Home and Redirect */}
          <Route strict exact path="/" component={Home} />
          <Route component={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </Suspense>
    </Router>
  )
}
