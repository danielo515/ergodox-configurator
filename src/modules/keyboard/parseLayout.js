// Regex that matches commas that are not inside parens
export const splitKeysRegex = /,\s*(?![^()]*\))/;
/**
 *  Regex to find the keycodes inside of a keycode array like this:
 * [2] = LAYOUT_ergodox(KC_ESCAPE,KC_F1,KC_F2,KC_F3,KC_F4,KC_F5)
 **/
const fullLayoutRegex = /(?:\[[0-9]+\]\s*=\s*[^(]*\()([\w\d\n\s\t,()]*)\),/;

// given an string representing an array of keycodes returns an array of each entry which can be a single keycode like KC_A or a composite one TD(copy)
export const splitEntries = str => str.split(splitKeysRegex);
// given a simple modifier key eg TO(1) it returns an object with code eg TD and params eg 1
export const parseCode = rawCode => {
  const [, code, params] = /([A-Z_0-9]+)(?:\(([^()]*)\))?/.exec(rawCode);
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

/**
 * Given a layout description (array of arrays) and a set of keys
 * puts the keys on the expected shape according to the layout.
 * @param {Array[Int[]]} layout
 */
export const keysToLayout = layout => keys => {
  return reduceSkipping(0)((acc, _, idx, offset) => {
    acc[idx] = { ...keys[idx - offset], id: idx };
    return acc;
  })({})(flatten(layout));
};

export const parseLayout = keyCodes => layoutStr => {
  const regexRes = fullLayoutRegex.exec(layoutStr);
  const toParse = regexRes ? regexRes[1] : layoutStr; // check if the full layout matches, then use the captured layout
  return splitEntries(toParse).map(identifyKey(keyCodes));
};
