import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Label from "./Label";

const Base = styled.div`
  position: absolute;
  border: 1px solid rgb(199, 199, 199);
  padding: 0;
  margin: 0;
  text-align: center;
  background-color: rgb(244, 244, 244);
  border-radius: 8px;
`;

const Cap = styled.div`
  background-color: white;
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

function Key({
  width,
  height,
  label,
  column,
  row,
  verticalSpan,
  lift,
  id,
  onClick
}) {
  const style = {
    width: `${width}%`,
    height: `${height * verticalSpan}%`,
    left: `${width * column}%`,
    top: `${height * (row - lift)}%`
  };
  const labels = Array.isArray(label) ? label : [label];
  return (
    <Base {...{ style }}>
      <Cap onClick={_ => onClick({ id })}>
        {label && <Label labels={labels} />}
      </Cap>
    </Base>
  );
}

Key.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

Key.defaultProps = {
  lift: 0
};

export default memo(Key);
