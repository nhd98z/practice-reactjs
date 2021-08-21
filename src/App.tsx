import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import { css } from '@emotion/css'

const PAGES: { page: string; exact?: boolean; strict?: boolean }[] = [
  { page: 'KeyboardNavigation' },
  { page: 'PracticeReactContext' },
  { page: 'TestUseRender' },
  { page: 'TestUsePrevious' },
  { page: 'TestUseCountUp' },
  { page: 'TestSocketIo' },
  { page: 'RenderLargeRealtimeList' },
  { page: 'TestReactQuery' },
  { page: 'TestReactTable' },
  { page: 'TestFieldDependencyWithReactHookForm' },
  { page: 'TestMaterialUi' },
  { page: 'TestBlueprintJs' },
  { page: 'TestModalAsAPage' },
  { page: 'TestModalAsAPage_PageThatCanOpenAsAModal' },
  { page: 'TestGuideModal' },
  { page: 'ImplementDebounceAndThrottle' },
  { page: 'TestIntroJs' },
  { page: 'TestReactHighlightWords' },
  { page: 'TestReadJsonFile' },
  { page: 'TestBlockVsNonBlockUi' },
  { page: 'TestReactClassComponentLifeCycle' },
  { page: 'TestReachUi' },
  { page: 'TestRemoveScroll' },
  { page: 'TestFunctionalComponentRerender' },
  { page: 'TestClassComponentRerender' },
  { page: 'TestObjectFitImageUrl' },
  { page: 'TestLayoutAndProtectedPage', exact: false },
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
              <Link to={`/${page.page}`}>{page.page}</Link>
            </div>
          ))}
        </div>
      </nav>

      <Suspense fallback={null}>
        <Switch>
          {PAGES.map((page, index) => (
            <Route
              key={index}
              strict={page.strict === undefined ? true : page.strict}
              exact={page.exact === undefined ? true : page.exact}
              path={`/${page.page}`}
              component={lazy(() => import(`./pages/${page.page}`))}
            />
          ))}
          {/* Home and Redirect */}
          <Route strict exact path="/" component={Home} />
          <Route component={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </Suspense>
    </Router>
  )
}
