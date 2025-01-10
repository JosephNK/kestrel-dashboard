export interface StateType {
  loading: boolean;
  data: any;
  error: any;
}

export interface ActionType {
  type: "LOADING" | "SUCCESS" | "ERROR";
  data?: any;
  error?: any;
}

export const INITIAL_STATE: StateType = {
  loading: false,
  data: null,
  error: null,
};

export const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
};
