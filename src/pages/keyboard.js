import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Keyboard from "../components/Keyboard";

export class KeyboardPage extends Component {
  static propTypes = {
    prop: PropTypes.string
  };

  render() {
    return <Keyboard />;
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = {};

const KeyboardPageConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardPage);
export default () => <KeyboardPageConnected />;
