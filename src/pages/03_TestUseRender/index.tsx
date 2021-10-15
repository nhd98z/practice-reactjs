import { useState } from 'react'
import useRender from './useRender'
import styled from '@emotion/styled'

const Heading = styled.h1`
  user-select: none;
`

export default function TestUseRender() {
  const render = useRender()
  const [count, setCount] = useState(Math.random())
  const [count2, setCount2] = useState(Math.random())

  return (
    <>
      <Heading>Number of Render: {render}</Heading>
      <Heading onClick={() => setCount(Math.random())}>Click to change state 1: {count}</Heading>
      <Heading onClick={() => setCount2(Math.random())}>Click to change state 2: {count2}</Heading>
    </>
  )
}
