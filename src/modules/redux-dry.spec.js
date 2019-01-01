import { makeReducer, default as dryRedux } from "./redux-dry";

const reducerMock = {
  TEST: arg => arg + 1,
  SUM: (state, { payload: amount }) => state + amount,
  SUM_TWO: state => state + 2
};

describe("Redux DRY", () => {
  it("[INTERNAL] It should create a reducer from a dictionary of functions", () => {
    const reducer = makeReducer(reducerMock, 0);
    expect(reducer).toBeInstanceOf(Function);
    expect(reducer(1, { type: "TEST" })).toEqual(2);
    expect(reducer(1, { type: "SUM", payload: 5 })).toEqual(6);
    expect(reducer(undefined, { type: "SUM", payload: 5 })).toEqual(5);
  });

  it("Should generate action creators properly prefixed", () => {
    const { actionCreators } = dryRedux("[test] ", 0, reducerMock);
    expect(actionCreators).toHaveProperty("test");
    expect(actionCreators).toHaveProperty("sum");
    expect(actionCreators).toHaveProperty("sumTwo");
    expect(actionCreators.test()).toEqual({ type: "[test] TEST" });
    expect(actionCreators.sum(5)).toEqual({ type: "[test] SUM", payload: 5 });
    expect(actionCreators.sumTwo()).toEqual({ type: "[test] SUM_TWO" });
  });

  it("Should create a reducer that reacts to prefixed actions", () => {
    const { reducer, actionCreators: actions } = dryRedux(
      "[test] ",
      0,
      reducerMock
    );
    expect(reducer).toBeInstanceOf(Function);

    expect(reducer(0, { type: "[test] TEST" })).toEqual(1);
    expect(reducer(1, { type: "[test] SUM", payload: 99 })).toEqual(100);
    expect(reducer(42, { type: "non-existing", payload: 99 })).toEqual(42);
  });

  it("Should create a reducer that works with the generated action creators", () => {
    const { reducer, actionCreators: actions } = dryRedux(
      "[test] ",
      0,
      reducerMock
    );
    expect(reducer).toBeInstanceOf(Function);

    expect(reducer(0, actions.test())).toEqual(1);
    expect(reducer(1, actions.sum(99))).toEqual(100);
    expect(reducer(1, actions.sumTwo())).toEqual(3);
  });
});
