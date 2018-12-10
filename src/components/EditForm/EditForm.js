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

class EditForm extends PureComponent {
  state = {
    keyCode: "KC_TRANSPARENT"
  };

  static defaultProps = {
    open: false,
    info: {}
  };

  static propTypes = {
    open: PropTypes.bool,
    info: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.onsSubmit = this.onsSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onsSubmit() {
    this.props.onClose({ key: this.state.key, ...this.props.info });
  }
  onChange(key) {
    this.setState({ key });
  }
  render() {
    const { open, keyOptions, classes } = this.props;
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
      </Dialog>
    );
  }
}

export default withStyles(styles)(EditForm);
