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

const makeRow = height => width => row => (keyType, idx) =>
  keyMapping[keyType]({
    width,
    height,
    row,
    column: idx,
    idx,
    label: `${row}x${idx}`
  });

// generate rows with
// JSON.stringify("x12345x".split("").map(label =>({label, verticalSpan: 1}))).replace('"label"','label').slice(1,-1)
export default () => {
  const leftLayout = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 2],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 3, 3, 1]
  ];
  const rightLayout = [
    [1, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0],
    [1, 3, 3, 0, 0, 0, 0]
  ];

  const rows = leftLayout.length;
  const height = 100 / rows;
  const width = 100 / leftLayout[0].length; // Fixed to first row width
  const rower = makeRow(height)(width);
  return (
    <Layout>
      <KeyboardTable>
        <Row style={{ marginRight: "5%" }}>
          {leftLayout.map((keys, rowIdx) => {
            const makeKey = rower(rowIdx);
            return keys.map(makeKey);
          })}
        </Row>
        <Row style={{ marginLeft: "5%" }}>
          {rightLayout.map((keys, rowIdx) => {
            const makeKey = rower(rowIdx);
            return keys.map(makeKey);
          })}
        </Row>
      </KeyboardTable>
    </Layout>
  );
};
