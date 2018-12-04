import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Keyboard from "../components/Keyboard";
import { actions as keyboardActions } from "../modules/keyboard";

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

export class KeyboardPage extends Component {
  static propTypes = {
    prop: PropTypes.string
  };

  render() {
    const { editKey, layout } = this.props;
    return (
      <Keyboard
        onKeySelect={editKey}
        layout={layout.description}
        split={layout.split}
      />
    );
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
