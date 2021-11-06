import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/00_Home'
import { css } from '@emotion/css'

const PAGES: { page: string; exact?: boolean; strict?: boolean }[] = [
  { page: '01_KeyboardNavigation' },
  { page: '02_PracticeReactContext' },
  { page: '03_TestUseRender' },
  { page: '04_TestUsePrevious' },
  { page: '05_TestUseCountUp' },
  { page: '06_TestSocketIo' },
  { page: '07_RenderLargeRealtimeList' },
  { page: '08_TestReactQuery' },
  { page: '09_TestReactTable' },
  { page: '10_TestFieldDependencyWithReactHookForm' },
  { page: '11_TestMaterialUi' },
  { page: '12_TestBlueprintJs' },
  { page: '13_TestModalAsAPage' },
  { page: '14_TestModalAsAPage_PageThatCanOpenAsAModal' },
  { page: '15_TestGuideModal' },
  { page: '16_ImplementDebounceAndThrottle' },
  { page: '17_TestIntroJs' },
  { page: '18_TestReactHighlightWords' },
  { page: '19_TestReadJsonFile' },
  { page: '20_TestBlockVsNonBlockUi' },
  { page: '21_TestReactClassComponentLifeCycle' },
  { page: '22_TestReachUi' },
  { page: '23_TestRemoveScroll' },
  { page: '24_TestFunctionalComponentRerender' },
  { page: '25_TestClassComponentRerender' },
  { page: '26_TestObjectFitImageUrl' },
  { page: '27_TestLayoutAndProtectedPage', exact: false },
  { page: '28_TestForwardRef' },
  { page: '29_TestUseRefWithInput' },
  { page: '30_AxiosErrorHandling' },
  { page: '31_CancelAxiosRequest' },
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
            <Link to="/">00_Home</Link>
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
          {/* 00_Home and Redirect */}
          <Route strict exact path="/00_Home" component={Home} />
          {PAGES.map((page, index) => (
            <Route
              key={index}
              strict={page.strict === undefined ? true : page.strict}
              exact={page.exact === undefined ? true : page.exact}
              path={`/${page.page}`}
              component={lazy(() => import(`./pages/${page.page}`))}
            />
          ))}
          <Route component={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </Suspense>
    </Router>
  )
}
