import React from "react";
import Key from "../components/Key";
import styled from "styled-components";

const Row = styled.div`
  position: relative;
  width: 100%;
  padding-top: 33%;
`;

const makeRow = height => width => row => (keyInfo, idx) => (
  <Key key={idx} {...{ width, height, row, column: idx }} {...keyInfo} />
);
// generate rows with
// JSON.stringify("x12345x".split("").map(label =>({label, verticalSpan: 1}))).replace('"label"','label').slice(1,-1)
export default () => {
  const keys = [
    [
      { label: "x", verticalSpan: 1 },
      { label: "1", verticalSpan: 1 },
      { label: "2", verticalSpan: 1 },
      { label: "3", verticalSpan: 1 },
      { label: "4", verticalSpan: 1 },
      { label: "5", verticalSpan: 1 },
      { label: "x", verticalSpan: 1 }
    ],
    [
      { label: "x", verticalSpan: 1 },
      { label: "q", verticalSpan: 1 },
      { label: "w", verticalSpan: 1 },
      { label: "e", verticalSpan: 1 },
      { label: "r", verticalSpan: 1 },
      { label: "t", verticalSpan: 1 },
      { label: "x", verticalSpan: 2 }
    ],

    [
      { label: "x", verticalSpan: 1 },
      { label: "a", verticalSpan: 1 },
      { label: "s", verticalSpan: 1 },
      { label: "d", verticalSpan: 1 },
      { label: "f", verticalSpan: 1 },
      { label: "g", verticalSpan: 1 }
    ],
    [
      { label: "x", verticalSpan: 1 },
      { label: "z", verticalSpan: 1 },
      { label: "x", verticalSpan: 1 },
      { label: "c", verticalSpan: 1 },
      { label: "v", verticalSpan: 1 },
      { label: "b", verticalSpan: 1 },
      { label: "x", verticalSpan: 2 }
    ],
    [
      { label: "kb", verticalSpan: 1 },
      { label: "ctl", verticalSpan: 1 },
      { label: "alt", verticalSpan: 1 },
      { label: "left", verticalSpan: 1 },
      { label: "right", verticalSpan: 1 }
    ]
  ];
  const rows = keys.length;
  const height = 100 / rows;
  const width = 100 / keys[0].length; // Fixed to first row width
  const rower = makeRow(height)(width);
  return (
    <Row>
      {keys.map((row, rowIdx) => {
        const makeKey = rower(rowIdx);
        return row.map(makeKey);
      })}
    </Row>
  );
};
