import React from "react";
import Key from "../components/Key";
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
  width: 90%;
  height: 600px;
  padding: 5%;
`;

const makeRow = height => width => row => (keyInfo, idx) =>
  keyInfo.skip ? null : (
    <Key key={idx} {...{ width, height, row, column: idx }} {...keyInfo} />
  );
// generate rows with
// JSON.stringify("x12345x".split("").map(label =>({label, verticalSpan: 1}))).replace('"label"','label').slice(1,-1)
export default () => {
  const keys = [
    [
      { label: " ", verticalSpan: 1 },
      { label: "1", verticalSpan: 1 },
      { label: "2", verticalSpan: 1 },
      { label: "3", verticalSpan: 1 },
      { label: "4", verticalSpan: 1 },
      { label: "5", verticalSpan: 1 },
      { label: " ", verticalSpan: 1 }
    ],
    [
      { label: " ", verticalSpan: 1 },
      { label: "q", verticalSpan: 1 },
      { label: "w", verticalSpan: 1 },
      { label: "e", verticalSpan: 1 },
      { label: "r", verticalSpan: 1 },
      { label: "t", verticalSpan: 1 },
      { label: " ", verticalSpan: 2 }
    ],

    [
      { label: " ", verticalSpan: 1 },
      { label: "a", verticalSpan: 1 },
      { label: "s", verticalSpan: 1 },
      { label: "d", verticalSpan: 1 },
      { label: "f", verticalSpan: 1 },
      { label: "g", verticalSpan: 1 },
      { label: "xx", verticalSpan: 1, skip: true }
    ],
    [
      { label: " ", verticalSpan: 1 },
      { label: "z", verticalSpan: 1 },
      { label: "x", verticalSpan: 1 },
      { label: "c", verticalSpan: 1 },
      { label: "v", verticalSpan: 1 },
      { label: "b", verticalSpan: 1 },
      { label: " ", verticalSpan: 2 }
    ],
    [
      { label: "kb", verticalSpan: 1 },
      { label: "ctl", verticalSpan: 1 },
      { label: "alt", verticalSpan: 1 },
      { label: "left", verticalSpan: 1 },
      { label: "right", verticalSpan: 1 },
      { label: "xx", verticalSpan: 1, skip: true },
      { label: "xx", verticalSpan: 1, skip: true }
    ]
  ];

  const keys2 = [
    [
      { label: " ", verticalSpan: 1 },
      { label: "6", verticalSpan: 1 },
      { label: "7", verticalSpan: 1 },
      { label: "8", verticalSpan: 1 },
      { label: "9", verticalSpan: 1 },
      { label: "0", verticalSpan: 1 },
      { label: " ", verticalSpan: 1 }
    ],
    [
      { label: " ", verticalSpan: 2 },
      { label: "y", verticalSpan: 1 },
      { label: "u", verticalSpan: 1 },
      { label: "i", verticalSpan: 1 },
      { label: "o", verticalSpan: 1 },
      { label: "p", verticalSpan: 1 },
      { label: " ", verticalSpan: 1 }
    ],
    [
      { label: "xx", verticalSpan: 1, skip: true },
      { label: "h", verticalSpan: 1 },
      { label: "j", verticalSpan: 1 },
      { label: "k", verticalSpan: 1 },
      { label: "l", verticalSpan: 1 },
      { label: ";", verticalSpan: 1 },
      { label: " ", verticalSpan: 1 }
    ],
    [
      { label: " ", verticalSpan: 2 },
      { label: "n", verticalSpan: 1 },
      { label: "m", verticalSpan: 1 },
      { label: ",", verticalSpan: 1 },
      { label: ".", verticalSpan: 1 },
      { label: "/", verticalSpan: 1 },
      { label: " ", verticalSpan: 1 }
    ],
    [
      { label: "xx", verticalSpan: 1, skip: true },
      { label: "xx", verticalSpan: 1, skip: true },
      { label: "up", verticalSpan: 1 },
      { label: "down", verticalSpan: 1 },
      { label: "[", verticalSpan: 1 },
      { label: "]", verticalSpan: 1 },
      { label: "osl", verticalSpan: 1 }
    ]
  ];

  const keys3 = [
    [
      { label: " ", verticalSpan: 1, skip: true },
      { label: " ", verticalSpan: 1 },
      { label: "  ", verticalSpan: 1 }
    ],
    [
      { label: " ", verticalSpan: 2 },
      { label: "  ", verticalSpan: 2 },
      { label: " ", verticalSpan: 1 }
    ],
    [
      { label: " ", verticalSpan: 1, skip: true },
      { label: " ", verticalSpan: 1, skip: true },
      { label: "  ", verticalSpan: 1 }
    ]
  ];
  const keys4 = [
    [
      { label: " ", verticalSpan: 1 },
      { label: " ", verticalSpan: 1 },
      { label: " ", verticalSpan: 1, skip: true }
    ],
    [
      { label: " ", verticalSpan: 1 },
      { label: " ", verticalSpan: 2 },
      { label: "  ", verticalSpan: 2 }
    ],
    [
      { label: " ", verticalSpan: 1 },
      { label: " ", verticalSpan: 1, skip: true },
      { label: "  ", verticalSpan: 1, skip: true }
    ]
  ];

  const rows = keys.length;
  const height = 100 / rows;
  const width = 100 / keys[0].length; // Fixed to first row width
  const rower = makeRow(height)(width);
  return (
    <Layout>
      <KeyboardTable>
        <Row>
          {keys.map((row, rowIdx) => {
            const makeKey = rower(rowIdx);
            return row.map(makeKey);
          })}
        </Row>
        <Row style={{ marginLeft: "10%" }}>
          {keys2.map((row, rowIdx) => {
            const makeKey = rower(rowIdx);
            return row.map(makeKey);
          })}
        </Row>
      </KeyboardTable>
      <KeyboardTable>
        <Row style={{ left: "26%" }}>
          {keys3.map((row, rowIdx) => {
            const makeKey = rower(rowIdx);
            return row.map(makeKey);
          })}
        </Row>
        <Row style={{ marginLeft: "10%" }}>
          {keys4.map((row, rowIdx) => {
            const makeKey = rower(rowIdx);
            return row.map(makeKey);
          })}
        </Row>
      </KeyboardTable>
    </Layout>
  );
};
