import { ApplicationContextState } from '.';
import { INCREASE_COUNT, DECREASE_COUNT } from './constants';

type Action =
  | { type: typeof INCREASE_COUNT; payload: { amount: number } }
  | { type: typeof DECREASE_COUNT; payload: { amount: number } };

export default function reducer(state: ApplicationContextState, action: Action): ApplicationContextState {
  switch (action.type) {
    case INCREASE_COUNT: {
      const { amount } = action.payload;
      return {
        ...state,
        count: state.count + amount,
      };
    }
    case DECREASE_COUNT: {
      const { amount } = action.payload;
      return {
        ...state,
        count: state.count - amount,
      };
    }
    default:
      throw Error(`Unexpected action type in ApplicationContext reducer`);
  }
}
