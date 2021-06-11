import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react'

interface State {
  count: number
}

type IApplicationContext = [
  State,
  {
    increaseCount: (amount: number) => void
    decreaseCount: (amount: number) => void
  }
]

const ApplicationContext = createContext<IApplicationContext | null>(null)

export function useApplicationContext() {
  const applicationContext = useContext(ApplicationContext)

  if (applicationContext === null) {
    throw new Error('useApplicationContext must be within ApplicationContext')
  }

  return applicationContext
}

//

enum Type {
  INCREASE_COUNT = 'INCREASE_COUNT',
  DECREASE_COUNT = 'DECREASE_COUNT',
}

type Action =
  | { type: Type.INCREASE_COUNT; payload: { amount: number } }
  | { type: Type.DECREASE_COUNT; payload: { amount: number } }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case Type.INCREASE_COUNT: {
      const { amount } = action.payload
      return {
        ...state,
        count: state.count + amount,
      }
    }
    case Type.DECREASE_COUNT: {
      const { amount } = action.payload
      return {
        ...state,
        count: state.count - amount,
      }
    }
    default:
      throw Error(`Unexpected action type in ApplicationContext reducer`)
  }
}

const INITIAL_STATE: State = { count: 0 }

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const increaseCount = useCallback((amount: number) => {
    dispatch({
      type: Type.INCREASE_COUNT,
      payload: { amount },
    })
  }, [])

  const decreaseCount = useCallback((amount) => {
    dispatch({
      type: Type.DECREASE_COUNT,
      payload: {
        amount,
      },
    })
  }, [])

  return (
    <ApplicationContext.Provider
      value={useMemo(
        () => [
          state,
          {
            increaseCount,
            decreaseCount,
          },
        ],
        [state, decreaseCount, increaseCount]
      )}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
