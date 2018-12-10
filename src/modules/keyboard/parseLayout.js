// given an string representing an array of keycodes returns an array of each entry which can be a single keycode like KC_A or a composite one TD(copy)
export const splitEntries = str => str.split(/,\s*(?![^()]*\))/);
export const parseCode = rawCode => {
  const [, code, params] = /([A-Z_0-9]+)(?:\(([^\(\)]*)\))?/.exec(rawCode);
  return { code, params };
};

export const identifyKey = keyCodes => rawCode => {
  const { code, params } = parseCode(rawCode);
  const key = keyCodes[code];
  return key || { value: code, category: "custom", params };
};

export const parseLayout = keyCodes => layoutStr =>
  splitEntries(layoutStr).map(identifyKey(keyCodes));
