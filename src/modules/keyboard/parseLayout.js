// given an string representing an array of keycodes returns an array of each entry which can be a single keycode like KC_A or a composite one TD(copy)
export const splitEntries = str => str.split(/,\s*(?![^()]*\))/);
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
    value: rawCode, // just let it be
    ...(params && { params })
  };
};

const reduceSkipping = toSkip => fn => arr => {
  let offset = 0;
  return arr.reduce((acc, val, idx) => {
    val !== toSkip ? acc.push(fn(val, idx, offset)) : offset++;
    return acc;
  }, []);
};

const flatten = arr => arr.reduce((a, b) => a.concat(b), []);

export const keysToLayout = layout => keys => {
  return reduceSkipping(0)((keyType, idx, offset) => {
    return { ...keys[idx - offset], id: idx };
  })(flatten(layout));
};

export const parseLayout = keyCodes => layoutStr =>
  splitEntries(layoutStr).map(identifyKey(keyCodes));
