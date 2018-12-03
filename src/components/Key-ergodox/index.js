import React from "react";
import styled from "styled-components";

import KeyBase from "./KeyBase";
import KeyTop from "./KeyTop";
import Led from "./Led";
import Label from "./Label";

const KeyLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

function Key({
  keyData: {
    color,
    position = { styles: {} },
    isConflictual,
    isDualFunction,
    isShine,
    isModifier,
    isSetShineColor,
    isSelected,
    isDisabled,
    labels,
    precedingKeyLabel,
    glyph,
    keyUrl,
    modifiers
  }
}) {
  const { keyBase, keyTop } = position.styles;

  const led =
    isSetShineColor === true ? (
      <Led style={{ backgroundColor: color }} />
    ) : null;

  let keyContent = null;
  if (glyph && precedingKeyLabel === null)
    if (modifiers !== null) {
      keyContent = [
        <Label key="modifiers" labels={[modifiers.label]} />,
        <span key="glyph" className={`icon-${glyph}`} />
      ];
    } else {
      keyContent = <span className={`icon-${glyph}`} />;
    }
  else {
    keyContent = <Label labels={precedingKeyLabel || labels} />;
  }
  return (
    <KeyBase
      isConflictual={isConflictual}
      isDualFunction={isDualFunction}
      isShine={isShine}
      isModifier={isModifier}
      isSelected={isSelected}
      style={keyBase}
    >
      <KeyLink to={keyUrl}>
        <KeyTop
          isConflictual={isConflictual}
          isDisabled={isDisabled}
          isDualFunction={isDualFunction}
          isShine={isShine}
          isModifier={isModifier}
          style={keyTop}
        >
          {led}
          {keyContent}
        </KeyTop>
      </KeyLink>
    </KeyBase>
  );
}

export default Key;
