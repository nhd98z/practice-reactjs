import { useContext } from 'react'

import { ApplicationContext } from '.'

function useApplicationContext() {
  const context = useContext(ApplicationContext)

  if (context === null) {
    throw new Error('useApplicationContext must be within ApplicationContext.Provider')
  }

  return context
}

export function useCountManager(): [
  number,
  { increaseCount: (amount: number) => void; decreaseCount: (amount: number) => void }
] {
  const [state, { increaseCount, decreaseCount }] = useApplicationContext()
  return [state.count, { increaseCount, decreaseCount }]
}
