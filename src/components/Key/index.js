import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Base = styled.div`
  position: absolute;
  border: 1px solid blue;
  padding: 0;
  margin: 0;
  text-align: center;
  background-color: grey;
  border-radius: 8px;
`;

const Label = styled.div`
  justify-content: center;
  width: 100%;
  text-align: center;
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
  onClick
}) {
  const style = {
    width: `${width}%`,
    height: `${height * verticalSpan}%`,
    left: `${width * column}%`,
    top: `${height * (row - lift)}%`
  };
  return (
    <Base {...{ style }}>
      <Cap onClick={_ => onClick({ row, col: column })}>
        <Label>{label}</Label>
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

export default Key;
