import styled, { css } from "styled-components";

const backgroundColor = css`
  ${({
    isConflictual,
    isDisabled,
    isDualFunction,
    isModifier,
    isShine,
    theme
  }) => {
    if (isConflictual === true) return theme.keyTopConflictual;
    if (isDisabled === true) return theme.keyTopBackgroundColor;
    if (isModifier === true) return theme.keyTopModifierBackgroundColor;
    if (isDualFunction === true) return theme.keyTopDualFunctionBackgroundColor;
    if (isShine === true) return theme.keyTopLedBackgroundColor;
    return theme.keyTopBackgroundColor;
  }};
`;

const backgroundImage = css`
  ${({ isConflictual, isDisabled }) => {
    if (isDisabled === true) {
      if (isConflictual === true)
        return "repeating-linear-gradient(-45deg, #ffa6a6 0px, #ffa6a6 5px, #ffaeae 5px, #ffaeae 10px) !important";
      return "repeating-linear-gradient(-45deg, #f5f5f5 0px, #f5f5f5 5px, #fff 5px, #fff 10px) !important";
    }
    return "inherit";
  }};
`;

const KeyTop = styled.div`
  background-image: ${backgroundImage};
  background-color: ${backgroundColor};
  border: 1px solid ${props => props.theme.keyTopBorderColor};
  border-radius: 3px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 90%;
  height: 80%;
  margin: 5% 5% 15%;
  cursor: pointer;
`;

export default KeyTop;
