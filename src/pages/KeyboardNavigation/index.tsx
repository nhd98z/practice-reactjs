import React from 'react'
import styled from '@emotion/styled'

const StyledDiv = styled.div`
  :focus {
    background: red;
  }
`

export default function KeyboardNavigation() {
  return (
    <>
      <button>This is a button</button>
      <StyledDiv>This is a div</StyledDiv>
      <StyledDiv
        tabIndex={0}
        onClick={() => {
          console.log('clicked')
        }}
      >
        This is a div (has onClick event) and tabindex="0"
      </StyledDiv>
      <button>This is a button</button>
      <button>This is a button</button>
      <StyledDiv
        tabIndex={0}
        onClick={() => {
          console.log('clicked')
        }}
      >
        This is a div (has onClick event) and tabindex="0"
      </StyledDiv>
      <button>This is a button</button>
    </>
  )
}
