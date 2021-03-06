import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "../Dialog";
import Select from "react-select";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {
    minWidth: "30%",
    overflowY: "visible"
  },
  DialogContent: {
    overflowY: "visible"
  }
};

const style = withStyles(styles);

/**
 *
 * @param {Object} KeyInfo
 * @param {Object} SelectedKey
 *
 */
const makeFormatLabel = keyCodes => ({ value, os }, params = {}) => {
  const { label } = keyCodes[value] || {};
  return typeof label === "function"
    ? label({
        code: value,
        command: params.value,
        os: os || params.os
      })
    : label;
};

const _isComplexKey = keyCodes => ({ value }) => {
  return (keyCodes[value] || {}).params;
};

const editForm = keyCodes => {
  const formatLabel = makeFormatLabel(keyCodes);
  const isComplexKey = _isComplexKey(keyCodes);

  class EditForm extends PureComponent {
    state = {
      key: {},
      params: {}
    };

    static defaultProps = {
      open: false,
      info: {}
    };

    static propTypes = {
      open: PropTypes.bool,
      info: PropTypes.object,
      modifierOptions: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    constructor(props) {
      super(props);
      this.onsSubmit = this.onsSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

    resetState() {
      this.setState({ key: {}, params: {} });
    }
    onsSubmit() {
      const { key, params } = this.state;
      const label = formatLabel(key, params);
      this.props.onClose({
        key: { ...key, label },
        ...this.props.info,
        params: this.state.params
      });
      this.resetState();
    }
    onChange(key) {
      this.setState({ key });
    }
    onParamsChange = this.onParamsChange.bind(this);
    onParamsChange(params) {
      this.setState({ params });
    }
    render() {
      const { open, keyOptions, classes, modifierOptions } = this.props;
      const { key } = this.state;
      return (
        <Dialog
          open={open}
          onClose={this.onsSubmit}
          classes={classes}
          text={"Keycode:"}
          actions={
            <Button onClick={this.onsSubmit} color="primary">
              Save
            </Button>
          }
        >
          <Select options={keyOptions} onChange={this.onChange} autoFocus />
          {isComplexKey(key) && (
            <Select
              options={modifierOptions}
              onChange={this.onParamsChange}
              autoFocus
            />
          )}
        </Dialog>
      );
    }
  }

  return style(EditForm);
};

export default editForm;
