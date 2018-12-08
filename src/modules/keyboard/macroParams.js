import { keyCodes } from "./keyDefinitions";

export const forwardLayers = (layerIdx, layers) =>
  layers
    .filter(layer => layer.position > layerIdx)
    .map(({ position, title }) => ({
      value: position,
      label: `${title} ${position}`
    }));

export const otherLayers = (layerIdx, layers) =>
  layers
    .filter(layer => layer.position !== layerIdx)
    .map(({ position, title }) => ({
      value: position,
      label: `${title} ${position}`
    }));

export const dualFunctionLabel = ({ code, command, os = "osx" }) => {
  let commandLabel = "";
  const commandData = keyCodes[command];
  if (commandData && command !== "KC_NO") {
    const { label, glyph } =
      os && commandData.os ? commandData.os[os] : commandData;
    commandLabel = glyph ? { glyph: true, src: glyph } : label || "";
  }
  const { menuLabel } = keyCodes[code];
  return [commandLabel, menuLabel];
};

export const shortcutsLabel = ({ code, command }) => {
  const { menuLabel } = keyCodes[code];
  if (command === "KC_NO") {
    return menuLabel;
  }
  let commandLabel = "";
  const commandData = keyCodes[command];
  if (commandData) {
    commandLabel = commandData.glyph
      ? { glyph: true, src: commandData.glyph }
      : commandData.menuLabel || commandData.label;
  }
  return `${menuLabel} + ${commandLabel}`;
};
