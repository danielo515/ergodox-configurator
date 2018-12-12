type State = {
  readonly importDialogOpen: boolean;
};
const initialState: State = {
  importDialogOpen: false
};

const prefix = "[ui]";
export const OPEN_IMPORT_DIALOG = `${prefix} OPEN_IMPORT_DIALOG`;

const openImport = () => ({
  type: OPEN_IMPORT_DIALOG
});
export const CLOSE_IMPORT_DIALOG = `${prefix} CLOSE_IMPORT_DIALOG`;

const closeImport = () => ({
  type: CLOSE_IMPORT_DIALOG
});

export const actions = {
  openImport,closeImport
};

export default (state: State = initialState, { type, payload }): State => {
  switch (type) {
    case OPEN_IMPORT_DIALOG:
      return { ...state, importDialogOpen: true };
    case CLOSE_IMPORT_DIALOG:
      return { ...state, importDialogOpen: false };

    default:
      return state;
  }
};
