import {
  LoaderAction,
  RESET_LOADING,
  START_LOADING,
  STOP_LOADING,
} from '../actions/LoaderActions';

export interface LoaderStatus {
  loadingCount: number;
}

const INITIAL_STATE: LoaderStatus = {
  loadingCount: 0,
};

export const LoaderReducer = (
  previousState: LoaderStatus = INITIAL_STATE,
  action: LoaderAction,
): LoaderStatus => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...previousState,
        loadingCount: previousState.loadingCount + 1,
      };
    case STOP_LOADING:
      return {
        ...previousState,
        loadingCount: Math.max(0, previousState.loadingCount - 1),
      };
    case RESET_LOADING:
      return {
        ...previousState,
        loadingCount: 0,
      };
    default:
      return previousState;
  }
};
