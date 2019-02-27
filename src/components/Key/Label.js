import React from "react";
import styled, { css } from "styled-components";

const fontSize = css`
  ${({ label }) => {
    if (label.length === 1) return "125%";
    if (label.length > 5) return "65%";
    return "85%";
  }};
`;

const LabelEntry = styled.div`
  font-size: ${fontSize};
  word-break: break-word;
  &:nth-child(2) {
    margin-top: 2px;
  }
`;

function Label({ labels }) {
  return labels.map((label, idx) => {
    const labelRender =
      label.glyph === true ? <span className={`icon-${label.src}`} /> : label;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <LabelEntry key={idx} label={label}>
        {labelRender}
      </LabelEntry>
    );
  });
}

export default Label;
