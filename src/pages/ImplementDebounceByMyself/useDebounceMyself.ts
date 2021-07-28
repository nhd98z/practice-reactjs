import { DependencyList, useEffect } from 'react'
import useTimeoutFnMyself from './useTimeoutFnMyself'

type UseDebounceReturn = [() => boolean | null, () => void]

type Fn = (...args: any) => any

export default function useDebounceMyself(fn: Fn, ms = 0, deps: DependencyList = []): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFnMyself(fn, ms)

  useEffect(reset, [...deps, reset])

  return [isReady, cancel]
}
