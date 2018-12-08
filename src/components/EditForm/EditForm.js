import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

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
    this.props.onClose({ keyCode: this.state.keyCode, ...this.props.info });
  }
  onChange({ target: { value } }) {
    this.setState({ keyCode: value });
  }
  render() {
    const { open } = this.props;
    return (
      <Dialog open={open} onClose={this.onsSubmit} aria-labelledby="edit-key">
        <DialogContent>
          <DialogContentText>Keycode:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="keycode"
            label="Keycode"
            fullWidth
            onChange={this.onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onsSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EditForm);
