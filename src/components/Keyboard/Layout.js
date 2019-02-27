import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
`;

const Top = styled.div`
  width: 100%;
  height: 5%;
  margin: 0;
`;
const Body = styled.div`
  width: 100%;
  height: 70%;
  margin: 0;
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Bottom = styled.div`
  width: 100%;
  height: 25%;
  margin: 0;
  padding: 0;
`;

function Layout(props) {
  return (
    <Wrapper>
      <Top>{props.top}</Top>
      <Body>{props.children}</Body>
      <Bottom>{props.bottom}</Bottom>
    </Wrapper>
  );
}

Layout.propTypes = {
  top: PropTypes.node,
  bottom: PropTypes.node
};

Layout.defaultProps = {
  classes: []
};

export default Layout;
