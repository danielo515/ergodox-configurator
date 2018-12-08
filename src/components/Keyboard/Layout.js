import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1160px;
  height: 100%;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
`;
const Top = styled.div`
  width: 100%;
  height: 70%;
  margin: 0;
  /* padding: 0 5%; */
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
