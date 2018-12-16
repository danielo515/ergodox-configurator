export const splitKeysRegex = /,\s*(?![^()]*\))/;
// given an string representing an array of keycodes returns an array of each entry which can be a single keycode like KC_A or a composite one TD(copy)
export const splitEntries = str => str.split(splitKeysRegex);
// given a simple modifier key eg TO(1) it returns an object with code eg TD and params eg 1
export const parseCode = rawCode => {
  const [, code, params] = /([A-Z_0-9]+)(?:\(([^\(\)]*)\))?/.exec(rawCode);
  return { code, params };
};
// turns a string representation of a key on the object equivalent
export const identifyKey = keyCodes => rawCode => {
  const { code, params } = parseCode(rawCode);
  const key = keyCodes[code] || {};
  return {
    category: "custom",
    ...key, // category must ve overridable by key
    label: typeof key.label === "string" ? key.label : rawCode, // TODO: generate the proper label
    value: rawCode.trim(), // just let it be
    ...(params && { params })
  };
};

const reduceSkipping = toSkip => fn => init => arr => {
  let offset = 0;
  console.log(arr);
  return arr.reduce((acc, val, idx) => {
    val !== toSkip ? fn(acc, val, idx, offset) : offset++;
    return acc;
  }, init);
};

const flatten = arr => arr.reduce((a, b) => a.concat(b), []);

export const keysToLayout = layout => keys => {
  return reduceSkipping(0)((acc, _, idx, offset) => {
    acc[idx] = { ...keys[idx - offset], id: idx };
    return acc;
  })({})(flatten(layout));
};

export const parseLayout = keyCodes => layoutStr =>
  splitEntries(layoutStr).map(identifyKey(keyCodes));
