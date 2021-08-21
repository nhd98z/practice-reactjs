import React, { memo, ReactNode, useState } from 'react'
import { Redirect, Route, RouteProps, Switch, useHistory } from 'react-router-dom'
import { css } from '@emotion/css'

let loggedIn = false // fake redux

//create your forceUpdate hook
function useForceUpdate() {
  const [, setValue] = useState(0) // integer state
  return () => setValue((value) => value + 1) // update the state to force render
}

function LayoutYellow({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        background-color: yellow;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {children}
    </div>
  )
}

function LayoutRed({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        background-color: red;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      {children}
    </div>
  )
}

function PublicLayoutYellowRoute({ component: Component, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <LayoutYellow>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Component {...props} />
        </LayoutYellow>
      )}
    />
  )
}

function PublicLayoutRedRoute({ component: Component, ...rest }: RouteProps) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <LayoutRed>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Component {...props} />
        </LayoutRed>
      )}
    />
  )
}

function ProtectedLayoutYellowRoute({ component: Component, ...rest }: RouteProps) {
  if (!loggedIn) return <Redirect to={{ pathname: '/TestLayoutAndProtectedPage' }} />
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <LayoutYellow>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Component {...props} />
          </LayoutYellow>
        )
      }}
    />
  )
}

function ProtectedLayoutRedRoute({ component: Component, ...rest }: RouteProps) {
  if (!loggedIn) return <Redirect to={{ pathname: '/TestLayoutAndProtectedPage' }} />
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <LayoutRed>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Component {...props} />
          </LayoutRed>
        )
      }}
    />
  )
}

const Page1 = memo(function Page1() {
  return <div>I am page 1: public and yellow</div>
})

const Page2 = memo(function Page2() {
  return <div>I am page 2: public and red</div>
})

const Page3 = memo(function Page3() {
  return <div>I am page 3: protected and yellow</div>
})

const Page4 = memo(function Page4() {
  return <div>I am page 4: protected and red</div>
})

export default memo(function TestLayoutAndProtectedPage() {
  const history = useHistory()
  const baseUrl = '/TestLayoutAndProtectedPage'
  const page1Url = baseUrl + '/page1'
  const page2Url = baseUrl + '/page2'
  const page3Url = baseUrl + '/page3'
  const page4Url = baseUrl + '/page4'
  const update = useForceUpdate()

  return (
    <>
      <div>{loggedIn && 'logged in'}</div>
      <button onClick={() => history.push(baseUrl)}>go base page</button>
      <button
        onClick={() => {
          loggedIn = !loggedIn
          update()
        }}
      >
        {loggedIn ? 'log out' : 'log in'}
      </button>
      <button onClick={() => history.goBack()}>go back</button>
      <button onClick={() => history.push(page1Url)}>go page 1</button>
      <button onClick={() => history.push(page2Url)}>go page 2</button>
      <button onClick={() => history.push(page3Url)}>go page 3</button>
      <button onClick={() => history.push(page4Url)}>go page 4</button>
      <button onClick={() => history.push(baseUrl + '/what_the_fuck')}>go page 404, then redirect to home page</button>
      <div>TestLayoutAndProtectedRoute</div>

      <Switch>
        <PublicLayoutYellowRoute exact path={page1Url} component={Page1} />
        <PublicLayoutRedRoute exact path={page2Url} component={Page2} />
        <ProtectedLayoutYellowRoute exact path={page3Url} component={Page3} />
        <ProtectedLayoutRedRoute exact path={page4Url} component={Page4} />
        <Route exact path={baseUrl + '/:wrong_path'} component={() => <Redirect to={{ pathname: baseUrl }} />} />
      </Switch>
    </>
  )
})
