const prefix = "[keyboard]";
export const EDIT_KEY = `${prefix} EDIT_KEY`;

const editKey = payload => ({
  type: EDIT_KEY,
  payload
});

const initialState = {
  keys: []
};

export const actions = {
  editKey
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_KEY:
      return state;

    default:
      return state;
  }
};
