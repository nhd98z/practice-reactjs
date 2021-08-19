import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import { css } from '@emotion/css'

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
  'TestMaterialUi',
  'TestBlueprintJs',
  'TestModalAsAPage',
  'TestModalAsAPage_PageThatCanOpenAsAModal',
  'TestGuideModal',
  'ImplementDebounceAndThrottle',
  'TestIntroJs',
  'TestReactHighlightWords',
  'TestReadJsonFile',
  'TestBlockVsNonBlockUi',
  'TestReactClassComponentLifeCycle',
  'TestReachUi',
  'TestRemoveScroll',
  'TestFunctionalComponentRerender',
  'TestClassComponentRerender',
  'TestObjectFitImageUrl',
  'TestLayoutAndProtectedPage',
]

export default function App() {
  return (
    <Router>
      <nav>
        <div
          className={css`
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            border: 5px solid lightcoral;
            padding: 1rem;
          `}
        >
          <div>
            <Link to="/">Home</Link>
          </div>
          {PAGES.map((page, index) => (
            <div key={index}>
              <Link to={`/${page}`}>{page}</Link>
            </div>
          ))}
        </div>
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
