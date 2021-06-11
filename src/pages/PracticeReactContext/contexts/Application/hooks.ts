import { useApplicationContext } from '.'

export function useCountManager(): [
  number,
  { increaseCount: (amount: number) => void; decreaseCount: (amount: number) => void }
] {
  const [state, { increaseCount, decreaseCount }] = useApplicationContext()
  return [state.count, { increaseCount, decreaseCount }]
}
