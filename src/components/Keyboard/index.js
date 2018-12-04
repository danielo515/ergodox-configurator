import React from "react";
import Key from "../Key";
import styled from "styled-components";

const Row = styled.div`
  position: relative;
  /* padding-top: 33%; */
  flex-grow: 1;
  height: 100%;
`;

const KeyboardTable = styled.div`
  display: flex;
  height: 50%;
`;

const Layout = styled.div`
  width: 80%;
  height: 90%;
  padding: 4% 10%;
`;

const keyMapping = {
  0: () => null,
  1: ({ idx, ...props }) => <Key key={idx} {...props} verticalSpan={1} />,
  2: ({ idx, ...props }) => <Key key={idx} {...props} verticalSpan={2} />,
  3: ({ idx, ...props }) => (
    <Key key={idx} {...props} verticalSpan={2} lift={1} />
  )
};

const makeRow = onClick => height => width => row => (keyType, idx) =>
  keyMapping[keyType]({
    width,
    height,
    onClick,
    row,
    column: idx,
    idx,
    label: `${row}x${idx}`
  });

// generate rows with
// JSON.stringify("x12345x".split("").map(label =>({label, verticalSpan: 1}))).replace('"label"','label').slice(1,-1)
export default ({ onKeySelect, layout }) => {
  const rows = layout.left.length;
  const height = 100 / rows;
  const width = 100 / layout.left[0].length; // Fixed to first row width
  const rower = makeRow(onKeySelect)(height)(width);
  return (
    <Layout>
      <KeyboardTable>
        <Row style={{ marginRight: "5%" }}>
          {layout.left.map((keys, rowIdx) => {
            const makeKey = rower(rowIdx);
            return keys.map(makeKey);
          })}
        </Row>
        <Row style={{ marginLeft: "5%" }}>
          {layout.right.map((keys, rowIdx) => {
            const makeKey = rower(rowIdx);
            return keys.map(makeKey);
          })}
        </Row>
      </KeyboardTable>
    </Layout>
  );
};
