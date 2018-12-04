import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Keyboard from "../components/Keyboard";
import { actions as keyboardActions } from "../modules/keyboard";

export class KeyboardPage extends Component {
  static propTypes = {
    prop: PropTypes.string
  };

  render() {
    const { editKey, layout } = this.props;
    return <Keyboard onKeySelect={editKey} layout={layout} />;
  }
}

const mapStateToProps = state => ({
  ...state.keyboard
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(keyboardActions, dispatch);

const KeyboardPageConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardPage);
export default () => <KeyboardPageConnected />;
