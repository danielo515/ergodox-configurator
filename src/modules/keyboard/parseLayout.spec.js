import { keyCodes, selectKeyOptions } from "./keyDefinitions.js";
import {
  splitEntries,
  parseLayout,
  identifyKey,
  keysToLayout,
  parseCode
} from "./parseLayout.js";

const simpleLayout = "KC_LEFT,KC_DOWN,KC_RIGHT,KC_TRANSPARENT,KC_TRANSPARENT";
const mediumLayout =
  "KC_ESCAPE,KC_1,KC_2,KC_3,KC_DELETE,KC_Q,KC_W,KC_E,TD(COPY_CUT),TO(1),LCTL(KC_V)";
const complexLayout =
  "KC_SLASH,LT(4,KC_KP_ASTERISK),LT(4,KC_ENTER),KC_DOWN,KC_LBRACKET,KC_RBRACKET,OSL(2)";

describe("Keyboard parsing", () => {
  it("Should turn a simple layout string into an array of strings", () => {
    const actual = splitEntries(simpleLayout);
    const expected = [
      "KC_LEFT",
      "KC_DOWN",
      "KC_RIGHT",
      "KC_TRANSPARENT",
      "KC_TRANSPARENT"
    ];
    expect(actual).toEqual(expected);
  });

  it("Should turn a layout of medium complexity into an array of strings", () => {
    const actual = splitEntries(mediumLayout);
    const expected = [
      "KC_ESCAPE",
      "KC_1",
      "KC_2",
      "KC_3",
      "KC_DELETE",
      "KC_Q",
      "KC_W",
      "KC_E",
      "TD(COPY_CUT)",
      "TO(1)",
      "LCTL(KC_V)"
    ];
    expect(actual).toEqual(expected);
  });

  it("Should turn a complex layout into an array of strings", () => {
    const actual = splitEntries(complexLayout);
    const expected = [
      "KC_SLASH",
      "LT(4,KC_KP_ASTERISK)",
      "LT(4,KC_ENTER)",
      "KC_DOWN",
      "KC_LBRACKET",
      "KC_RBRACKET",
      "OSL(2)"
    ];
    expect(actual).toEqual(expected);
  });

  describe("Parsing keycodes", () => {
    it("Should parse complex keycodes", () => {
      const expected = [
        { code: "TD", params: "COPY_CUT" },
        { code: "TO", params: "1" },
        { code: "LCTL", params: "KC_V" }
      ];
      const actual = ["TD(COPY_CUT)", "TO(1)", "LCTL(KC_V)"].map(parseCode);

      expect(actual).toEqual(expected);
    });
  });

  it("Should turn a simple layout string into an array of keyCodes", () => {
    const actual = parseLayout(keyCodes)(simpleLayout);
    const makeExpectedKey = code => ({ ...keyCodes[code], value: code });
    const expected = [
      makeExpectedKey("KC_LEFT"),
      makeExpectedKey("KC_DOWN"),
      makeExpectedKey("KC_RIGHT"),
      makeExpectedKey("KC_TRANSPARENT"),
      makeExpectedKey("KC_TRANSPARENT")
    ];
    expect(actual).toEqual(expected);
  });
  it("Should turn a medium complex layout string into an array of keyCodes", () => {
    const actual = parseLayout(keyCodes)(mediumLayout);
    const expected = [
      keyCodes["KC_ESCAPE"],
      keyCodes["KC_1"],
      keyCodes["KC_2"],
      keyCodes["KC_3"],
      keyCodes["KC_DELETE"],
      keyCodes["KC_Q"],
      keyCodes["KC_W"],
      keyCodes["KC_E"],
      keyCodes["TD"],
      keyCodes["TO"],
      keyCodes["LCTL"]
    ];
    expect(actual).toEqual(expected);
  });
});

describe("Layout translate", () => {
  it("It should assign index to keys based on layout", () => {
    const keys = [
      { category: "spacing", jsCode: "Escape", label: "Esc" },
      { category: "digit", jsCode: "Digit1", label: "1" },
      { category: "digit", jsCode: "Digit2", label: "2" }
    ];
    const layout = [[1, 0, 1], [0, 1]];
    const expected = {
      0: { category: "spacing", jsCode: "Escape", label: "Esc", id: 0 },
      2: { category: "digit", jsCode: "Digit1", label: "1", id: 2 },
      4: { category: "digit", jsCode: "Digit2", label: "2", id: 4 }
    };
    const actual = keysToLayout(layout)(keys);
    expect(actual).toEqual(expected);
  });
});
