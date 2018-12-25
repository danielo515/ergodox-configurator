export const makeActions = (prefix: String, actions: Object) => {};

const camelize = (str: string) =>
  str
    .toLowerCase()
    .split(/[_]/)
    .map((str, idx) => (idx === 0 ? str : str[0].toUpperCase() + str.slice(1)))
    .join("");

type fnDict = {
  [s: string]: Function;
};

type Dict = {
  [s: string]: any;
};

const actionCreatorsReducer = (prefix: string) => (
  red: Dict,
  action: string
) => {
  const type = prefix + action; // Compute it once, not on every action creator call!
  red[camelize(action)] = (payload: any) => ({
    type,
    payload
  });
  return red;
};

const prefixObjKey = (prefix: string, obj: Dict) => {
  return (red: Dict, key: string) => {
    red[prefix + key] = obj[key];
    return red;
  };
};

interface action {
  type: string;
  payload: any;
}

export const makeReducer = (reducers: fnDict, initialState: any) => (
  state = initialState,
  action: action
) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action) : state;
};

const assert = (assertion: boolean, msg: string) => {
  if (assertion) throw new Error(msg);
};

export default (prefix: string, initialState: any, reducers: fnDict) => {
  assert(initialState === undefined, "Initial state should not be undefined");
  const actionNames = Object.keys(reducers);
  const createAction = actionCreatorsReducer(prefix);
  const prefixReducer = prefixObjKey(prefix, reducers);
  const { actions, reducer: prefixedReducers } = actionNames.reduce(
    ({ actions, reducer }, action) => ({
      actions: createAction(actions, action),
      reducer: prefixReducer(reducer, action)
    }),
    { actions: {}, reducer: {} }
  );

  return {
    actionCreators: actions,
    reducer: makeReducer(prefixedReducers, initialState)
  };
};
