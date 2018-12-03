import styled, { css } from "styled-components";

const backgroundColor = css`
  ${({ isConflictual, isDualFunction, isModifier, isShine, theme }) => {
    if (isConflictual === true) return theme.keyBaseConflictual;
    if (isModifier === true) return theme.keyBaseModifierBackgroundColor;
    if (isDualFunction === true)
      return theme.keyBaseDualFunctionBackgroundColor;
    if (isShine === true) return theme.keyBaseLedBackgroundColor;
    return theme.keyBaseBackgroundColor;
  }};
`;

const KeyBase = styled.div`
  transition: box-shadow 0.2s ease;
  border: 1px solid ${props => props.theme.keyBaseBorderColor};
  position: absolute;
  border-radius: ${({ theme }) => (5 / theme.keyBaseHeight) * 100}%;
  box-shadow: ${({ isSelected, theme }) =>
    isSelected === true ? theme.keyBaseActiveShadow : "inherit"};
  background-color: ${backgroundColor};
  padding: 0;
  margin: 0;
  text-align: center;
  z-index: ${({ isSelected }) => (isSelected === true ? 2 : 0)};
  &:hover {
    z-index: 1;
    box-shadow: ${({ isSelected, theme }) =>
      isSelected === true
        ? theme.keyBaseActiveShadow
        : theme.keyBaseHoverShadow};
  }
`;

KeyBase.defaultProps = {
  width: 1,
  height: 1
};

export default KeyBase;
