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
import { grey } from "ansi-colors";

const styles = theme => ({
  paper: {
    minWidth: "50%",
    minHeight: "50%",
    maxWidth: "70%"
  },
  DialogContent: {
    width: "100%"
  },
  codeWrapper: {
    backgroundColor: "rgb(244, 244, 244)",
    border: "1px solid grey",
    borderRadius: "6px",
    padding: "6px"
  }
});

class ExportDialog extends PureComponent {
  state = {
    keyCode: "KC_TRANSPARENT"
  };

  static defaultProps = {
    open: false,
    info: {}
  };

  static propTypes = {
    open: PropTypes.bool,
    text: PropTypes.string,
    close: PropTypes.func
  };

  render() {
    const { open, close, classes, text } = this.props;
    return (
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="edit-key"
        classes={{ paper: classes.paper }}
      >
        <DialogContent classes={{ root: classes.DialogContent }}>
          <DialogContentText>Generated layout:</DialogContentText>
          <pre className={classes.codeWrapper}>
            <code>{text}</code>
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ExportDialog);
