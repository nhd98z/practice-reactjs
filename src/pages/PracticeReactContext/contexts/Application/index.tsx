import { createContext, useReducer, useMemo, useCallback } from 'react';
import { DECREASE_COUNT, INCREASE_COUNT } from './constants';
import reducer from './reducer';

export type ApplicationContextState = {
  count: number;
};

export type ApplicationContextDispatch = {
  increaseCount: (amount: number) => void;
  decreaseCount: (amount: number) => void;
};

export const ApplicationContext = createContext<[ApplicationContextState, ApplicationContextDispatch] | null>(null);

const INITIAL_STATE: ApplicationContextState = { count: 0 };

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const increaseCount = useCallback((amount: number) => {
    dispatch({
      type: INCREASE_COUNT,
      payload: { amount },
    });
  }, []);

  const decreaseCount = useCallback((amount: number) => {
    dispatch({
      type: DECREASE_COUNT,
      payload: {
        amount,
      },
    });
  }, []);

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
  );
}
