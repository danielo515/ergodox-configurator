import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;
const Top = styled.div`
  width: 100%;
  height: 70%;
  margin: 0;
  padding: 0;
`;
const Bottom = styled.div`
  width: 100%;
  height: 30%;
  margin: 0;
  padding: 0;
`;

function Layout(props) {
  return (
    <Wrapper>
      <Top>{props.top}</Top>
      <Bottom>{props.bottom}</Bottom>
    </Wrapper>
  );
}

Layout.propTypes = {
  top: PropTypes.node,
  bottom: PropTypes.node
};

export default Layout;
