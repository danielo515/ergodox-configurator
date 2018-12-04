import React from "react";
import Key from "../Key";
import styled from "styled-components";
import PropTypes from "prop-types";

const KeyboardSection = styled.div`
  position: relative;
  margin: 0 5%;
  flex-grow: 1;
  height: 100%;
`;

const KeyboardTable = styled.div`
  display: flex;
  height: 100%;
`;

const Layout = styled.div`
  width: 80%;
  height: 90%;
  padding: 4% 10%;
`;

const keyMapping = {
  0: () => null,
  1: props => <Key {...props} verticalSpan={1} />,
  2: props => <Key {...props} verticalSpan={2} />,
  3: props => <Key {...props} verticalSpan={2} lift={1} />
};

const makeRow = onClick => keysData => height => width => (
  rowLn,
  maxRows
) => row => (keyType, idx) => {
  const id = idx + row * rowLn;
  return keyMapping[keyType]({
    width,
    height,
    onClick,
    row: row % maxRows,
    column: idx,
    key: `${row}x${idx}`,
    id,
    label: (keysData[id] || {}).label || ""
  });
};

// generate rows with
// JSON.stringify("x12345x".split("").map(label =>({label, verticalSpan: 1}))).replace('"label"','label').slice(1,-1)
const Keyboard = ({ onKeySelect, layout, split, keysData }) => {
  const rows = layout.length;
  const rowsPerSide = rows / 2; // Just in case of split keyboard
  const rowLn = layout[0].length; // Fixed to first row width
  const height = 100 / rows;
  const width = 100 / rowLn;
  const rower = makeRow(onKeySelect)(keysData)(height)(width)(
    rowLn,
    rowsPerSide
  );
  const rowsElements = layout.map((keys, row) => keys.map(rower(row)));
  const hands = split
    ? [rowsElements.slice(0, rowsPerSide), rowsElements.slice(rowsPerSide)]
    : rowsElements;
  return (
    <Layout>
      <KeyboardTable>
        {hands.map((hand, side) => (
          <KeyboardSection key={`hand ${side}`}>{hand}</KeyboardSection>
        ))}
      </KeyboardTable>
    </Layout>
  );
};

Keyboard.propTypes = {
  split: PropTypes.bool,
  layout: PropTypes.arrayOf(PropTypes.array)
};

export default Keyboard;
