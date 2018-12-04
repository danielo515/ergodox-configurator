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

const makeRow = onClick => rowLength => height => width => offset => row => (
  keyType,
  idx
) =>
  console.log(`${offset}${row}${idx}`) ||
  keyMapping[keyType]({
    width,
    height,
    onClick,
    row,
    column: idx,
    key: `${offset}${row}${idx}`,
    id: idx + row * rowLength + offset,
    label: `${row}x${idx}`
  });

// generate rows with
// JSON.stringify("x12345x".split("").map(label =>({label, verticalSpan: 1}))).replace('"label"','label').slice(1,-1)
const Keyboard = ({ onKeySelect, layout, split }) => {
  const rows = layout.length;
  const splitOffset = rows / 2; // Just in case of split keyboard
  const rowLn = layout[0].length; // Fixed to first row width
  const height = 100 / rows;
  const width = 100 / rowLn;
  const rower = makeRow(onKeySelect)(rowLn)(height)(width);
  const hands = split
    ? [layout.slice(0, splitOffset), layout.slice(splitOffset)]
    : layout;
  return (
    <Layout>
      <KeyboardTable>
        {hands.map((hand, side) => {
          const keyWithOffset = rower(side * splitOffset * rowLn);
          return (
            <KeyboardSection key={`hand ${side}`}>
              {hand.map((keys, rowIdx) => {
                const makeKey = keyWithOffset(rowIdx);
                return keys.map(makeKey);
              })}
            </KeyboardSection>
          );
        })}
      </KeyboardTable>
    </Layout>
  );
};

Keyboard.propTypes = {
  split: PropTypes.bool,
  layout: PropTypes.arrayOf(PropTypes.array)
};

export default Keyboard;
