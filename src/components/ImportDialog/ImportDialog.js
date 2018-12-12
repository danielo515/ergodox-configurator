import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "../Dialog";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {
    minWidth: "80%"
  },
  DialogContent: {}
};

const style = withStyles(styles);

class Import extends PureComponent {
  state = {
    text: ""
  };

  static defaultProps = {
    open: false
  };

  static propTypes = {
    open: PropTypes.bool,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func.isRequired
  };

  resetState() {
    this.setState({ text: "" });
  }

  onChange = this.onChange.bind(this);
  onChange({ target: { value } }) {
    this.setState({ text: value });
  }

  onSubmit = this.onSubmit.bind(this);
  onSubmit() {
    this.props.onSubmit(this.state.text);
    this.resetState();
    this.props.onClose();
  }

  render() {
    const { open, onClose, classes } = this.props;
    const { text } = this.state;
    return (
      <Dialog
        open={open}
        onClose={onClose}
        classes={classes}
        title="Layout import"
        text={"Paste the layout here:"}
        actions={
          <Button onClick={this.onSubmit} color="primary">
            Import
          </Button>
        }
      >
        <TextField
          id="import-layout-paste"
          label="your layout"
          multiline
          // rowsMax="4"
          fullWidth
          margin="normal"
          variant="outlined"
          value={text}
          onChange={this.onChange}
        />
      </Dialog>
    );
  }
}

export default style(Import);
